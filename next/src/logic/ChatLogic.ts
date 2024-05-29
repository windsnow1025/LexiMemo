import ChatService, {StreamResponse} from "../service/ChatService";
import {Message} from "../model/Message"
import {ApiTypeModel} from "@/src/model/Chat";
import {UserLogic} from "@/src/logic/UserLogic";

export class ChatLogic {
  private chatService: ChatService;
  public initMessages: Message[];
  public defaultApiType: string;
  public defaultModel: string;

  constructor() {

    this.chatService = new ChatService();

    this.initMessages = [
      {
        "role": "system",
        "text":
`
# LexiMemo
## Requirements
Upon receiving a list of English words, the following tasks will be executed with precision and creativity:
1. **Word Count**: Calculate the total number of words provided.
2. **Translation Table**: Create a table listing each English word alongside its Chinese translation, facilitating a bilingual understanding.
3. **Paragraph**: Craft a short paragraph which should be easy to understand and incorporate all the listed words.
    - Bold each word and follow it with its corresponding number in the list using \`<sup>...</sup>\`.
    - Allow modification of the **part of speech** for any word (e.g., changing a noun to an adjective, a verb, etc.), as long as the root word remains recognizable.
    - Ensuring all words are included.
    - Exclude the Chinese translations from this narrative section.
    - The sequence of words in the paragraph does not need to match the order in the word list.

## Example:

### User:

imperative
unsparing
bellicose
disposition
penetrate
penitent
austere
voluble

### Assistant:

Total number of words: 8

| English Word | Chinese Translation |
|--------------|---------------------|
| imperative   | 势在必行的               |
| unsparing    | 不留情面的               |
| bellicose    | 好战的                 |
| disposition  | 性格                  |
| penetrate    | 穿透                  |
| penitent     | 忏悔者                 |
| austere      | 严峻的                 |
| voluble      | 健谈的                 |

No other contemporary poet’s work has such a well-earned reputation for near **impenetrability**<sup>5</sup>, and there are few whose moral vision is so **imperiously**<sup>1</sup> **unsparing**<sup>2</sup>. Of late, however, the almost **belligerent**<sup>3</sup> demands of his severe and densely forbidding poetry have taken an improbable turn. This new collection is the poet’s fourth book in six years—an ample output even for poets of sunny **disposition**<sup>4</sup>, let alone for one of such **penitential**<sup>6</sup> **austerity**<sup>7</sup> over the previous 50 years. Yet for all his newfound **volubility**<sup>8</sup>, his poetry is as thorny as ever.
`
        ,
        "files": []
      },
      {
        "role": "user",
        "text": "",
        "files": []
      }
    ];

    this.defaultApiType = "open_ai";
    this.defaultModel = "gpt-4o";
  }

  // 只需 new ChatLogic(), 然后 await generateVocabsParagraph()

  async getUserWord() {
    const userLogic = new UserLogic();
    const token = localStorage.getItem('token')!;
    try {
      const userWords = await userLogic.getUserWord(token);
      const wordList = userWords.map((wordObj: { word: { word: any; }; }) => wordObj.word.word).join(', ');
      return wordList;
    } catch (error) {
      console.error("Error fetching user words:", error);
      return '';
    }
  }

  async generateVocabsParagraph() {
    const text = await this.getUserWord();
    const messages = this.initMessages;
    messages[1].text = text;
    return await this.nonStreamGenerate(messages, this.defaultApiType, this.defaultModel, 0, false);
  }

  async nonStreamGenerate(messages: Message[], api_type: string, model: string, temperature: number, stream: boolean) {
    const unsanitizedMessages = messages.map(message => ({
      ...message,
      text: this.unsanitize(message.text)
    }));

    try {
      const content = await this.chatService.generate(unsanitizedMessages, api_type, model, temperature, stream) as string;
      return this.sanitize(content);
    } catch (err) {
      console.error("Error in POST /:", err);
      throw err;
    }
  }

  async *streamGenerate(messages: Message[], api_type: string, model: string, temperature: number, stream: boolean) {
    let controller;

    const unsanitizedMessages = messages.map(message => ({
      ...message,
      text: this.unsanitize(message.text)
    }));

    try {

      const response = await this.chatService.generate(unsanitizedMessages, api_type, model, temperature, stream) as StreamResponse;
      controller = response.controller;
      const reader = response.reader;

      while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        yield this.sanitize(new TextDecoder().decode(value));
      }

    } catch (err) {
      console.error("Error in POST /:", err);
      throw err;
    } finally {
      if (controller) {
        controller.abort();
      }
    }
  }

  sanitize(content: string) {
    return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  unsanitize(content: string) {
    return content
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
}