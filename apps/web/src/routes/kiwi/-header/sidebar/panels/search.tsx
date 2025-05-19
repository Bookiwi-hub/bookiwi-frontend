import { Search } from "lucide-react";
import { useState } from "react";

import Section from "@bookiwi/epubjs/types/section";

import { Input } from "#/components/ui/input";
import { useBook } from "#/routes/kiwi/-reader";
import { debounce } from "#/utils/debounce";

interface SearchResult {
  cfi: string;
  excerpt: string;
}

interface MatchType {
  tocLabel: string;
  id: string;
  results: SearchResult[];
}

function SearchPanel() {
  const { book } = useBook();
  const [searchTerm, setSearchTerm] = useState("");
  const [matchResults, setMatchResults] = useState<MatchType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchKeyword = async (keyword: string): Promise<MatchType[]> => {
    if (!book) return [];

    return new Promise((resolve) => {
      const matchItems: MatchType[] = [];
      const sections: Section[] = [];

      // First, collect all the sections
      book.spine.each((section: Section) => {
        sections.push(section);
      });

      let completedSearches = 0;

      // Process each section
      sections.forEach((section) => {
        requestIdleCallback(() => {
          const sectionResults = section.find(
            keyword,
          ) as unknown as SearchResult[];

          if (sectionResults && sectionResults.length) {
            const navItem =
              book.navigation && book.navigation.get(section.href);

            const sectionId = section.href;

            const match = {
              tocLabel: navItem?.label || "Unknown section",
              id: sectionId,
              results: sectionResults,
            };

            matchItems.push(match);
          }

          completedSearches += 1;

          // Resolve only when all sections have been searched
          if (completedSearches >= sections.length) {
            resolve(matchItems);
          }
        });
      });

      // Fallback in case requestIdleCallback doesn't work
      setTimeout(() => {
        resolve(matchItems);
      }, 3000);
    });
  };

  // Create a debounced search function
  const debouncedSearch = debounce(async (term: string) => {
    if (!term.trim()) {
      setMatchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchKeyword(term);
      setMatchResults(results);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  }, 1000);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">검색</h3>
      <div className="relative">
        <Search
          size={18}
          className="absolute left-2 top-2.5 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="책 내용 검색..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {isSearching && (
        <div className="mt-4 text-sm text-muted-foreground">검색 중...</div>
      )}

      {!isSearching && matchResults.length > 0 ? (
        <div className="mt-4">
          {matchResults.map((sectionResult) => (
            <div key={sectionResult.id} className="mb-2 rounded-md border p-2">
              <div className="text-sm font-medium">
                {sectionResult.tocLabel}
              </div>
              <div className="mt-1">
                {sectionResult.results.map((result) => (
                  <div key={result.cfi} className="mb-1 text-sm">
                    {result.excerpt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isSearching && (
          <div className="mt-4 text-sm text-muted-foreground">
            {searchTerm
              ? "검색 결과가 없습니다."
              : "검색 결과가 여기에 표시됩니다."}
          </div>
        )
      )}
    </div>
  );
}

export default SearchPanel;
