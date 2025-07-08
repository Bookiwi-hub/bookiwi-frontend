import { Book, NavItem } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import { Epub, Kiwi, Participant } from "@bookiwi/supabase/types/response";

import { defer, Deferred } from "#/utils/defer";

interface KiwiManagerProps {
  kiwi: Kiwi;
  epub: Epub;
  participants: Participant[];
  currentParticipant: Participant;
}

class KiwiManager {
  private epubBook: Book | null = null;

  private sections: Section[] = [];

  private nav: NavItem[] = [];

  private ready: Deferred<boolean>;

  private kiwi: Kiwi | null = null;

  private epub: Epub | null = null;

  private participants: Participant[] = [];

  private currentParticipant: Participant | null = null;

  constructor() {
    this.ready = defer();
  }

  async newKiwi(props: KiwiManagerProps) {
    try {
      await this.init(props);
      this.ready.resolve(true);
    } catch (error) {
      this.ready.reject(error);
      throw error;
    }
  }

  getBook() {
    return this.epubBook;
  }

  getSections() {
    return this.sections;
  }

  getNav() {
    return this.nav;
  }

  getParticipants() {
    return this.participants;
  }

  getCurrentParticipant() {
    return this.currentParticipant;
  }

  getKiwi() {
    return this.kiwi;
  }

  getEpub() {
    return this.epub;
  }

  async destroy() {
    this.epubBook = null;
    this.sections = [];
    this.nav = [];
    this.ready = defer();
  }

  async waitForInit() {
    return this.ready.promise;
  }

  private async init(props: KiwiManagerProps) {
    const { kiwi, epub, participants, currentParticipant } = props;
    const newEpubBook = new Book(epub.file);
    const newSections: Section[] = [];
    await newEpubBook.ready;
    newEpubBook.locations.load(epub.locations);
    newEpubBook.spine.each((section: Section) => {
      section.load(newEpubBook.load.bind(newEpubBook));
      newSections.push(section);
    });
    const navigation = await newEpubBook.loaded.navigation;
    this.nav = navigation.toc;
    this.epubBook = newEpubBook;
    this.sections = newSections;
    this.kiwi = kiwi;
    this.epub = epub;
    this.participants = participants;
    this.currentParticipant = currentParticipant;
  }
}

const kiwiManager = new KiwiManager();

export default kiwiManager;
