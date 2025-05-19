import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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

// Highlights search terms in the given text
const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;

  // Escape special regex characters in the search term
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedSearchTerm})`, "gi");

  // Split the text by the regex and map the parts
  const parts = text.split(regex);

  return parts.map((part, i) => {
    // Check if this part matches the search term (case insensitive)
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <mark
          // eslint-disable-next-line react/no-array-index-key
          key={`${part}-${i}`}
          className="rounded-sm bg-yellow-200 px-0.5 font-medium text-black"
        >
          {part}
        </mark>
      );
    }
    return part;
  });
};

function SearchPanel() {
  const { book } = useBook();
  const [searchTerm, setSearchTerm] = useState("");
  const [matchResults, setMatchResults] = useState<MatchType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const searchKeyword = useCallback(
    async (keyword: string): Promise<MatchType[]> => {
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
      });
    },
    [book],
  );

  const handleSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setMatchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchKeyword(term);
        setMatchResults(results);

        // Initialize expanded sections - by default, expand all sections
        const newExpandedSections: Record<string, boolean> = {};
        results.forEach((section) => {
          newExpandedSections[section.id] = true;
        });
        setExpandedSections(newExpandedSections);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert("검색 중 오류가 발생했습니다.");
      } finally {
        setIsSearching(false);
      }
    },
    [searchKeyword],
  );

  // Create a debounced search function
  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 1000),
    [handleSearch],
  );

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
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
          onChange={handleKeywordChange}
        />
      </div>

      {isSearching && (
        <div className="mt-4 text-sm text-muted-foreground">검색 중...</div>
      )}

      {!isSearching && matchResults.length > 0 ? (
        <div className="mt-4">
          {matchResults.map((sectionResult) => (
            <div
              key={sectionResult.id}
              className="mb-3 rounded-md border p-2 shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-medium"
                onClick={() => toggleSection(sectionResult.id)}
                aria-expanded={expandedSections[sectionResult.id]}
              >
                <div className="flex items-center gap-1">
                  {expandedSections[sectionResult.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  {sectionResult.tocLabel}
                </div>
                <div className="text-xs text-muted-foreground">
                  {sectionResult.results.length}개 결과
                </div>
              </button>

              {expandedSections[sectionResult.id] && (
                <div className="mt-4 space-y-3">
                  {sectionResult.results.map((result) => (
                    <div key={result.cfi} className="group relative">
                      <div className="rounded-md border-2 border-primary/10 bg-card p-4 text-sm shadow-md transition-all hover:border-primary/30 hover:bg-card/90">
                        <p className="line-clamp-3 leading-relaxed">
                          <span className="italic text-foreground/80">
                            &ldquo;
                            {highlightSearchTerm(result.excerpt, searchTerm)}
                            &rdquo;
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
