/*!
 * Snippet-Actions v1.0.55
 * 文本片段处理工具集。
 * Author: 稻米鼠
 * Created: 2025-04-02 18:07:00
 * Updated: 2025-04-09 12:50:57
 * Repository: https://github.com/dmscode/Snippet-Actions.git
 */
"use strict";
var SA = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // package.json
  var require_package = __commonJS({
    "package.json"(exports, module) {
      module.exports = {
        name: "Snippet-Actions",
        version: "1.0.55",
        description: "\u6587\u672C\u7247\u6BB5\u5904\u7406\u5DE5\u5177\u96C6\u3002",
        main: "dist/main.js",
        repository: "https://github.com/dmscode/Snippet-Actions.git",
        author: "\u7A3B\u7C73\u9F20",
        scripts: {
          build: "yarn version --patch --no-git-tag-version && node build.js",
          test: "jest",
          "test:watch": "jest --watch"
        },
        devDependencies: {
          "@types/jest": "^29.5.14",
          esbuild: "^0.19.11",
          "fs-extra": "^11.3.0",
          jest: "^29.7.0",
          "jest-html-reporters": "^3.1.7",
          "ts-jest": "^29.3.1",
          typescript: "^5.8.2"
        },
        license: "UNLICENSED"
      };
    }
  });

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    SnippetActions: () => SnippetActions
  });

  // src/actions/RemoveZeroWidthChars.ts
  function RemoveZeroWidthChars(input) {
    if (!input)
      return "";
    const pattern = /[\u200B-\u200F\uFEFF\u061C\u2060-\u2069\uFFF9-\uFFFB]+/g;
    return input.replace(pattern, "");
  }

  // src/actions/CorrectCase.ts
  var AI_ML_WORDS = [
    "AI",
    "Bard",
    "ChatGLM",
    "ChatGPT",
    "Claude 3",
    "Claude",
    "Copilot",
    "CUDA",
    "DALL-E",
    "DeepSeek",
    "Diffusion",
    "Gemini",
    "GPT-3.5",
    "GPT-3",
    "GPT-4",
    "GPT-4o",
    "GPT-4V",
    "GPT-J",
    "Hugging Face",
    "LangChain",
    "Llama 2",
    "Llama 3",
    "LLaMA",
    "LLM",
    "Midjourney",
    "NVIDIA",
    "OpenAI",
    "OpenRouter",
    "Qwen",
    "RAG",
    "Stable Diffusion"
  ];
  var COMPANIES_BRANDS = [
    "Amazon",
    "Apple",
    "Facebook",
    "Google",
    "LinkedIn",
    "Microsoft",
    "TikTok",
    "Twitter",
    "YouTube",
    "Adobe",
    "Airbnb",
    "Alibaba",
    "Alphabet",
    "AMD",
    "Baidu",
    "ByteDance",
    "Cisco",
    "Dell",
    "Dropbox",
    "eBay",
    "Figma",
    "HP",
    "Huawei",
    "IBM",
    "Intel",
    "JetBrains",
    "Lenovo",
    "Meta",
    "Mozilla",
    "Netflix",
    "NVIDIA",
    "Oracle",
    "PayPal",
    "Qualcomm",
    "Salesforce",
    "Samsung",
    "Shopify",
    "Slack",
    "Sony",
    "Spotify",
    "Stripe",
    "Tencent",
    "Tesla",
    "Uber",
    "Xiaomi",
    "Zoom"
  ];
  var SOFTWARE_PRODUCTS = [
    // Adobe 系列
    "Photoshop",
    "Illustrator",
    "XD",
    "InDesign",
    "Premiere Pro",
    "After Effects",
    "Lightroom",
    "Acrobat",
    "Audition",
    "Animate",
    "Dreamweaver",
    "Bridge",
    "Character Animator",
    "Dimension",
    "Media Encoder",
    // 办公软件
    "Word",
    "Excel",
    "PowerPoint",
    "Outlook",
    "Access",
    "OneNote",
    "WPS",
    "LibreOffice",
    "OpenOffice",
    "Pages",
    "Numbers",
    "Keynote",
    // 设计软件
    "Sketch",
    "Figma",
    "CorelDRAW",
    "Affinity",
    "Affinity Designer",
    "Affinity Photo",
    "Affinity Publisher",
    "Blender",
    "Maya",
    "Cinema 4D",
    "SketchUp",
    "AutoCAD",
    "Rhino",
    // 影音软件
    "VLC",
    "Windows Media Player",
    "QuickTime",
    "PotPlayer",
    "Audacity",
    "Ableton Live",
    "DaVinci Resolve",
    "Final Cut Pro",
    "iMovie",
    "Vegas Pro",
    // 实用工具
    "WinRAR",
    "7-Zip",
    "TeamViewer",
    "AnyDesk",
    "CCleaner",
    "Malwarebytes",
    "Everything",
    "Snagit",
    "Camtasia",
    "OBS Studio",
    "HandBrake",
    "FileZilla",
    "Rufus",
    "Revo Uninstaller",
    "Wordpress"
  ];
  var GAMES = [
    "Minecraft",
    "Among Us",
    "Apex Legends",
    "Call of Duty",
    "Counter-Strike",
    "CS:GO",
    "CS2",
    "Cyberpunk 2077",
    "DOTA 2",
    "Elden Ring",
    "Fortnite",
    "Genshin Impact",
    "GTA V",
    "Half-Life",
    "Honkai: Star Rail",
    "League of Legends",
    "Mario",
    "Overwatch",
    "PUBG",
    "Roblox",
    "The Legend of Zelda",
    "Valorant",
    "World of Warcraft"
  ];
  var OPERATING_SYSTEMS = [
    "Android",
    "Arch",
    "CentOS",
    "Debian",
    "Fedora",
    "Gentoo",
    "Linux",
    "macOS",
    "openSUSE",
    "Ubuntu",
    "Windows",
    "iOS",
    "iPadOS",
    "tvOS",
    "watchOS",
    "AlmaLinux",
    "Alpine",
    "AmigaOS",
    "Chrome OS",
    "Deepin",
    "elementary OS",
    "FreeBSD",
    "HarmonyOS",
    "Kali Linux",
    "KDE Neon",
    "Kubuntu",
    "Lubuntu",
    "Manjaro",
    "MX Linux",
    "NetBSD",
    "OpenBSD",
    "Oracle Linux",
    "Pop!_OS",
    "RHEL",
    "Rocky Linux",
    "Solaris",
    "SteamOS",
    "Tails",
    "Void Linux",
    "Windows 10",
    "Windows 11",
    "Windows Server",
    "Xubuntu",
    "Zorin OS"
  ];
  var DEV_TOOLS_EDITORS = [
    "Atom",
    "Cursor",
    "Emacs",
    "Neovim",
    "Sublime Text",
    "VS Code",
    "Vim",
    "Notepad++",
    "Android Studio",
    "AppCode",
    "Brackets",
    "CLion",
    "CodePen",
    "CodeSandbox",
    "DataGrip",
    "Eclipse",
    "Fleet",
    "GoLand",
    "IntelliJ IDEA",
    "Jupyter",
    "Komodo",
    "Light Table",
    "Nova",
    "PhpStorm",
    "PyCharm",
    "Rider",
    "RStudio",
    "RubyMine",
    "Spyder",
    "TextMate",
    "UltraEdit",
    "Visual Studio",
    "VSCodium",
    "WebStorm",
    "Xcode",
    "Zed"
  ];
  var NOTE_KNOWLEDGE_TOOLS = [
    "Excalidraw",
    "Logseq",
    "Notion",
    "Obsidian",
    "Roam Research",
    "Trae",
    "Typora",
    "Zettlr",
    "Agenda",
    "Amplenote",
    "Anytype",
    "Athens Research",
    "Bear",
    "Capacities",
    "Craft",
    "DEVONthink",
    "Dendron",
    "Evernote",
    "Fibery",
    "Heptabase",
    "Inkdrop",
    "Joplin",
    "MarginNote",
    "Microsoft OneNote",
    "Milanote",
    "Miro",
    "Nimbus Note",
    "NotePlan",
    "Notability",
    "Notejoy",
    "Notesnook",
    "Reflect",
    "RemNote",
    "Scrintal",
    "Standard Notes",
    "Supernotes",
    "Tana",
    "TheBrain",
    "Ulysses",
    "WorkFlowy"
  ];
  var VERSION_CONTROL = [
    "BitBucket",
    "GitHub",
    "GitLab",
    "Azure DevOps",
    "AWS CodeCommit",
    "Beanstalk",
    "Codebase",
    "Gitea",
    "Gogs",
    "Launchpad",
    "Mercurial",
    "Perforce",
    "Phabricator",
    "Plastic SCM",
    "RhodeCode",
    "SourceForge",
    "Subversion",
    "Team Foundation Server",
    "Gerrit",
    "Git",
    "SVN",
    "CVS"
  ];
  var PROGRAMMING_LANGUAGES = [
    "CSS",
    "HTML",
    "JSON",
    "Java",
    "JavaScript",
    "LaTeX",
    "Markdown",
    "PHP",
    "Python",
    "TypeScript",
    "XML",
    "YAML",
    "Ada",
    "AppleScript",
    "Assembly",
    "Bash",
    "COBOL",
    "CoffeeScript",
    "Crystal",
    "Dart",
    "Delphi",
    "Elixir",
    "Elm",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Julia",
    "Kotlin",
    "Lisp",
    "Lua",
    "MATLAB",
    "Objective-C",
    "OCaml",
    "Pascal",
    "Perl",
    "PowerShell",
    "Prolog",
    "Racket",
    "Ruby",
    "Rust",
    "Scala",
    "Scheme",
    "Shell",
    "SQL",
    "Swift",
    "Tcl",
    "VB.NET",
    "Visual Basic",
    "WebAssembly",
    "WASM",
    "AsciiDoc",
    "BBCode",
    "CSV",
    "DocBook",
    "Graphviz",
    "MediaWiki",
    "reStructuredText",
    "SVG",
    "TOML",
    "TSX",
    "JSX"
  ];
  var DEV_FRAMEWORKS_TOOLS = [
    "Angular",
    "Docker",
    "ESLint",
    "Jest",
    "Kubernetes",
    "Node.js",
    "React",
    "Vue",
    "npm",
    "webpack",
    "yarn",
    "Ansible",
    "Apollo",
    "Astro",
    "Babel",
    "Bootstrap",
    "Capacitor",
    "Composer",
    "Cordova",
    "Cypress",
    "Django",
    "Electron",
    "Ember.js",
    "Express",
    "FastAPI",
    "Flask",
    "Flutter",
    "Gatsby",
    "Git",
    "GitFlow",
    "Gradle",
    "GraphQL",
    "Gulp",
    "Helm",
    "Hugo",
    "Ionic",
    "Jenkins",
    "jQuery",
    "Laravel",
    "Lerna",
    "Lodash",
    "Maven",
    "Mocha",
    "NestJS",
    "Next.js",
    "Nginx",
    "NuGet",
    "NuxtJS",
    "Parcel",
    "Playwright",
    "Podman",
    "Prettier",
    "Prisma",
    "Prometheus",
    "Puppeteer",
    "PyPI",
    "Rails",
    "Redux",
    "Remix",
    "RollupJS",
    "RxJS",
    "Sass",
    "Selenium",
    "Sentry",
    "Serverless",
    "Spring Boot",
    "Storybook",
    "Svelte",
    "Tailwind CSS",
    "Terraform",
    "Three.js",
    "TypeORM",
    "Vite",
    "Vitest",
    "Vue Router",
    "Vuex",
    "Webpack",
    "Xamarin",
    "pnpm"
  ];
  var DATABASES = [
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Amazon RDS",
    "Apache Cassandra",
    "Azure SQL",
    "CockroachDB",
    "Couchbase",
    "DynamoDB",
    "Elasticsearch",
    "Firebase",
    "InfluxDB",
    "MariaDB",
    "Microsoft SQL Server",
    "Neo4j",
    "Oracle Database",
    "PlanetScale",
    "RavenDB",
    "SQLite",
    "Supabase",
    "Timescale"
  ];
  var CLOUD_SERVICES = [
    "AWS",
    "Azure",
    "Google Cloud",
    "Alibaba Cloud",
    "Cloudflare",
    "DigitalOcean",
    "Heroku",
    "IBM Cloud",
    "Linode",
    "Oracle Cloud",
    "OVHcloud",
    "Render",
    "Tencent Cloud",
    "Vercel",
    "Vultr"
  ];
  var COMMAND_LINE_TOOLS = [
    "Bash",
    "PowerShell",
    "cmd",
    "cURL",
    "Fish",
    "Git Bash",
    "iTerm2",
    "Oh My Zsh",
    "Terminal",
    "Windows Terminal",
    "Zsh"
  ];
  var BROWSERS = [
    "Arc",
    "Brave",
    "Chrome",
    "Edge",
    "Firefox",
    "Opera",
    "Safari",
    "Chromium",
    "DuckDuckGo",
    "Internet Explorer",
    "Tor Browser",
    "Vivaldi"
  ];
  var MOBILE_DEVICES = [
    "iPad",
    "iPhone",
    "Android",
    "Galaxy",
    "Huawei",
    "iPad Air",
    "iPad mini",
    "iPad Pro",
    "iPhone SE",
    "Kindle",
    "Pixel",
    "Surface",
    "Xiaomi"
  ];
  var MESSAGING_SOCIAL = [
    "Discord",
    "Instagram",
    "Slack",
    "Telegram",
    "WeChat",
    "WhatsApp",
    "BeReal",
    "Bluesky",
    "Facebook",
    "Feishu",
    "Flickr",
    "Gitter",
    "Google Chat",
    "Google Meet",
    "iMessage",
    "Kakao Talk",
    "LINE",
    "LinkedIn",
    "Mastodon",
    "Matrix",
    "Messenger",
    "Microsoft Teams",
    "Pinterest",
    "QQ",
    "Reddit",
    "Signal",
    "Skype",
    "Snapchat",
    "Threads",
    "TikTok",
    "Tumblr",
    "Twitter",
    "Viber",
    "VK",
    "WeiBo",
    "X",
    "YouTube",
    "Zoom"
  ];
  var HARDWARE = [
    "AMD",
    "ARM",
    "AirPods",
    "Apple Watch",
    "CPU",
    "GPU",
    "HDD",
    "Intel",
    "MacBook",
    "MacBook Air",
    "MacBook Pro",
    "Mac mini",
    "Mac Pro",
    "NVIDIA",
    "RAM",
    "RTX",
    "Raspberry Pi",
    "SSD",
    "ThinkPad",
    "USB-C"
  ];
  var PROGRAMMING_CONCEPTS = [
    "API",
    "CRUD",
    "DRY",
    "DevOps",
    "IoT",
    "MVC",
    "OOP",
    "REST",
    "SOLID",
    "TDD",
    "UI/UX",
    "WebRTC"
  ];
  var NETWORK_PROTOCOLS = [
    "DNS",
    "FTP",
    "GraphQL",
    "HTTP",
    "HTTPS",
    "IMAP",
    "IP",
    "IPv4",
    "IPv6",
    "OAuth",
    "POP3",
    "REST",
    "SMTP",
    "SOAP",
    "SSH",
    "TCP",
    "TCP/IP",
    "UDP",
    "WebRTC",
    "WebSocket"
  ];
  var TECH_STANDARDS = [
    "Bluetooth",
    "DisplayPort",
    "HDMI",
    "NFC",
    "USB",
    "USB-A",
    "USB-C",
    "Type-C",
    "VGA",
    "Wi-Fi"
  ];
  var CRYPTO_BLOCKCHAIN = [
    "Bitcoin",
    "Blockchain",
    "Coinbase",
    "DAO",
    "DApp",
    "DeFi",
    "Ethereum",
    "MetaMask",
    "NFT",
    "Solana",
    "Web3"
  ];
  var CASE_SENSITIVE_WORDS = [
    ...AI_ML_WORDS,
    ...COMPANIES_BRANDS,
    ...SOFTWARE_PRODUCTS,
    ...GAMES,
    ...OPERATING_SYSTEMS,
    ...DEV_TOOLS_EDITORS,
    ...NOTE_KNOWLEDGE_TOOLS,
    ...VERSION_CONTROL,
    ...PROGRAMMING_LANGUAGES,
    ...DEV_FRAMEWORKS_TOOLS,
    ...DATABASES,
    ...CLOUD_SERVICES,
    ...COMMAND_LINE_TOOLS,
    ...BROWSERS,
    ...MOBILE_DEVICES,
    ...MESSAGING_SOCIAL,
    ...HARDWARE,
    ...PROGRAMMING_CONCEPTS,
    ...NETWORK_PROTOCOLS,
    ...TECH_STANDARDS,
    ...CRYPTO_BLOCKCHAIN
  ];
  var getDict = (dict) => {
    const dictMap = /* @__PURE__ */ new Map();
    dict.forEach((word) => {
      let key = word.toLowerCase();
      dictMap.set(key, word);
      if (/[- .]/.test(key)) {
        dictMap.set(key.replace(/[- .]/, ""), word);
      }
    });
    return dictMap;
  };
  var defaultDict = getDict(CASE_SENSITIVE_WORDS);
  var CorrectCase = (input, dict) => {
    if (!input)
      return "";
    dict = dict instanceof Map ? dict : Array.isArray(dict) ? getDict(dict) : defaultDict;
    let result = input;
    for (const [key, value] of dict.entries()) {
      const regexKey = key.replace(/([+.])/g, "\\$1");
      const regex = new RegExp(`\\b${regexKey}${/[+.]$/.test(regexKey) ? "" : "\\b"}`, "gi");
      result = result.replace(regex, value);
    }
    return result;
  };

  // src/actions/EmojiMarkdown.ts
  var markdownRender = class {
    constructor(content) {
      // 定义处理器数组，包含标题、无序列表和有序列表的处理方法
      this.handlers = [
        this.titleHandler.bind(this),
        this.codeBlockHandler.bind(this),
        this.blockquoteHandler.bind(this),
        this.hrHandler.bind(this),
        this.unorderedListHandler.bind(this),
        this.orderedListHandler.bind(this),
        this.spanTextHandler.bind(this),
        this.urlHandler.bind(this)
      ];
      this.content = content;
    }
    /**
     * 渲染方法，依次执行所有处理器
     */
    render() {
      return this.handlers.reduce((content, handler) => handler(content), this.content);
    }
    /**
     * 标题处理器，将 Markdown 标题转换为带表情符号的格式
     */
    titleHandler(content) {
      return content.replace(/^(#+)\s(.*)/gm, (match, level, title) => {
        title = title.replace(/\s+#+$/g, "");
        const levelStr = (character) => new Array(Math.max(4 - level.length, 1)).fill(character).join("");
        const titleMark = levelStr("\u{1F4CC}");
        return `${titleMark}${levelStr(">")} ${title} ${levelStr("<")}${titleMark}

`;
      });
    }
    /**
     * 代码块处理器，将代码块转换为带表情符号的格式
     */
    codeBlockHandler(content) {
      return content.replace(/^`{3,}(\w*)\r?\n+([\s\S]*?)\r?\n`{3,}\r?\n/gm, (match, language, code) => {
        return `\u{1F4BB}${language.length ? language + " " : ""}Code\u{1F4BB}
${code}
\u{1F4BB}Code End!\u{1F4BB}`;
      });
    }
    /**
     * 引用块处理器，将引用块转换为带表情符号的格式
     */
    blockquoteHandler(content) {
      return content.replace(/^>\s(.*)/gm, (match, text) => {
        return `\u{1F4DC}\u27A4 ${text}`;
      });
    }
    /**
     * 分隔线处理器，将分隔线转换为带表情符号的格式
    */
    hrHandler(content) {
      return content.replace(/^-{3,}|_{3,}|\*{3,}$/gm, () => {
        return `\u2B50 \u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u2B50 \u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u2B50`;
      });
    }
    /**
     * 无序列表处理器，将无序列表项转换为带表情符号的格式
     */
    unorderedListHandler(content) {
      const taskStatus = {
        " ": "\u2B1C",
        // 待办
        "/": "\u{1F6A7}",
        // 未完成
        "x": "\u2705",
        // 已完成
        "-": "\u274C",
        // 已取消
        ">": "\u2197\uFE0F",
        // 已转发
        "<": "\u{1F4C5}",
        // 日程安排
        "?": "\u2753",
        // 问题
        "!": "\u2757",
        // 重要
        "*": "\u2B50",
        // 星标
        '"': "\u{1F4AC}",
        // 引用
        "l": "\u{1F4CD}",
        // 位置
        "b": "\u{1F516}",
        // 书签
        "i": "\u2139\uFE0F",
        // 信息
        "S": "\u{1F4B0}",
        // 储蓄
        "I": "\u{1F4A1}",
        // 想法
        "p": "\u{1F44D}",
        // 优点
        "c": "\u{1F44E}",
        // 缺点
        "f": "\u{1F525}",
        // 火热
        "k": "\u{1F511}",
        // 关键
        "w": "\u{1F3C6}",
        // 胜利
        "u": "\u{1F4C8}",
        // 上升
        "d": "\u{1F4C9}"
        // 下降
      };
      return content.replace(/^([ \t]*)[-+*] +(.*)/gm, (match, space, text) => {
        let isTask = false;
        text = text.replace(/^\[(.)\]\s+/, (match2, status) => {
          isTask = true;
          return (taskStatus[status] || `\u3010${status}\u3011`) + " ";
        });
        return `${space.length ? "\u{1F539}" : "\u{1F53B}"}${isTask ? "" : " "}${text}`;
      });
    }
    /**
     * 有序列表处理器，将数字编号转换为表情符号数字
     */
    orderedListHandler(content) {
      return content.replace(/^([ \t]*)(\d+)\. (.*)/gm, (match, space, index, text) => {
        const numMarks = ["0\uFE0F\u20E3", "1\uFE0F\u20E3", "2\uFE0F\u20E3", "3\uFE0F\u20E3", "4\uFE0F\u20E3", "5\uFE0F\u20E3", "6\uFE0F\u20E3", "7\uFE0F\u20E3", "8\uFE0F\u20E3", "9\uFE0F\u20E3"];
        const indexMark = index.split("").map((num) => numMarks[parseInt(num)]).join("");
        return `${space}${indexMark} ${text}`;
      });
    }
    /**
     * 行内文本样式处理器，将 Markdown 行内标记转换为带表情符号的格式
     * @param content 需要处理的文本内容
     * @returns 处理后的文本
     */
    spanTextHandler(content) {
      return content.replace(/\*\*(.+?)\*\*/g, "\u3010$1\u3011").replace(/__(.+?)__/g, "\u3010$1\u3011").replace(/\*(.+?)\*/g, "\u300E$1\u300F").replace(/_(.+?)_/g, "\u300E$1\u300F").replace(/~~(.+?)~~/g, "\u274C$1\u274C").replace(/==(.+?)==/g, "\u{1F4A1}$1\u{1F4A1}").replace(/`+(.+?)`+/g, "\u{1F4BB}$1\u{1F4BB}");
    }
    /**
     * 链接处理器，将 Markdown 链接转换为带表情符号的格式
     * @param content 需要处理的文本内容
     * @returns 处理后的文本
     */
    urlHandler(content) {
      return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "\u{1F517}\u3010$1\u3011( $2 )").replace(/\[([^\]]+)\]\[\^?([^\]]+)\]/g, "\u{1F517}\u3010$1\u3011[\u{1F4CD}$2]");
    }
  };
  var EmojiMarkdown = (input) => {
    if (!input)
      return "";
    return new markdownRender(input).render();
  };

  // src/actions/WhiteSpace.ts
  var replacer = (content) => content.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])|([a-zA-Z0-9])([\u4e00-\u9fa5])/g, "$1$3 $2$4");
  var WhiteSpace = (input) => {
    if (input === "")
      return "";
    return replacer(replacer(input));
  };

  // src/actions/FormatExpression.ts
  var VariantSymbols = /* @__PURE__ */ new Map([
    ["\uFF08", "("],
    ["\uFF09", ")"],
    ["\u3010", "["],
    ["\u3011", "]"],
    ["\u300A", "<"],
    ["\u300B", ">"],
    ["\uFF5B", "{"],
    ["\uFF5D", "}"],
    ["\uFF05", "%"],
    ["\uFF0B", "+"],
    ["\uFF0D", "-"],
    ["\uFF0A", "*"],
    ["\uFF0F", "/"],
    ["\uFF1D", "="],
    ["\uFF1C", "<"],
    ["\uFF1E", ">"],
    ["\uFF5E", "~"],
    ["\uFF01", "!"],
    ["\uFF1A", ":"],
    ["\uFF5C", "|"],
    ["\uFF3E", "^"],
    ["\uFF0E", "."],
    ["\uFF0C", ","],
    ["\uFF1B", ";"],
    ["\uFF3F", "_"],
    ["\uFF03", "#"],
    ["\uFF06", "&"],
    ["\uFF20", "@"],
    ["\uFF04", "$"],
    ["==", "="]
  ]);
  var StandardSymbols = /* @__PURE__ */ new Map([
    [">=", "\u2265"],
    ["<=", "\u2264"],
    ["!=", "\u2260"],
    ["~=", "\u2248"],
    ["+-", "\xB1"],
    ["-+", "\u2213"],
    ["*", "\xD7"],
    ["/", "\xF7"],
    ["pi", "\u03C0"],
    ["alpha", "\u03B1"],
    ["beta", "\u03B2"],
    ["gamma", "\u03B3"],
    ["delta", "\u03B4"],
    ["theta", "\u03B8"],
    ["lambda", "\u03BB"],
    ["sigma", "\u03C3"],
    ["omega", "\u03C9"],
    ["inf", "\u221E"],
    ["sqrt", "\u221A"],
    ["->>", "\u27F9"],
    ["<->", "\u2194"],
    ["->", "\u2192"],
    ["<-", "\u2190"],
    ["<=>", "\u21D4"],
    ["=>", "\u21D2"],
    ["=<", "\u21D0"],
    ["sum", "\u2211"],
    ["prod", "\u220F"],
    ["int", "\u222B"],
    ["union", "\u222A"],
    ["inter", "\u2229"],
    ["in", "\u2208"],
    ["notin", "\u2209"],
    ["subset", "\u2282"],
    ["supset", "\u2283"],
    ["empty", "\u2205"],
    ["...", "\u2026"],
    ["||", "\u2225"],
    ["deg", "\xB0"]
  ]);
  var FormatExpression = (input, displayMode = false) => {
    if (!input)
      return "";
    let result = input.trim();
    for (const [variant, standard] of VariantSymbols) {
      result = result.replaceAll(variant, standard);
    }
    if (displayMode) {
      for (const [standard, variant] of StandardSymbols) {
        result = result.replaceAll(standard, variant);
      }
    }
    return result;
  };

  // src/main.ts
  var pkg = require_package();
  var SnippetActions = class {
    /**
     * 初始化代码片段处理类
     * @param input 输入文本，为空时默认为空字符串
     */
    constructor(input) {
      // 可用的处理方法集合
      this.actions = {
        RemoveZeroWidthChars: {
          name: "\u79FB\u9664\u96F6\u5BBD\u5B57\u7B26",
          description: "\u79FB\u9664\u6587\u672C\u4E2D\u7684\u96F6\u5BBD\u5B57\u7B26",
          action: RemoveZeroWidthChars
        },
        CorrectCase: {
          name: "\u4FEE\u6B63\u7279\u5B9A\u8BCD\u6C47\u7684\u5927\u5C0F\u5199",
          description: "\u4FEE\u6B63\u6587\u672C\u4E2D\u7279\u5B9A\u8BCD\u6C47\u7684\u5927\u5C0F\u5199",
          action: CorrectCase
        },
        EmojiMarkdown: {
          name: "Markdown \u6587\u672C\u5316",
          description: "\u5C06 Markdown \u8F6C\u6362\u4E3A\u7528 Emoji \u8FDB\u884C\u6807\u8BB0\u7684\u7EAF\u6587\u672C\u683C\u5F0F",
          action: EmojiMarkdown
        },
        WhiteSpace: {
          name: "\u76D8\u53E4\u4E4B\u767D",
          description: "\u5728\u4E2D\u6587\u548C\u82F1\u6587/\u6570\u5B57\u4E4B\u95F4\u6DFB\u52A0\u7A7A\u683C",
          action: WhiteSpace
        },
        FormatExpression: {
          name: "\u683C\u5F0F\u5316\u8BA1\u7B97\u5F0F\uFF08Use\uFF09",
          description: "\u66FF\u6362\u56E0\u4E3A\u8F93\u5165\u6CD5\u4E3A\u6B63\u786E\u5207\u6362\u800C\u4EA7\u751F\u7684\u5F02\u4F53\u5B57\u7B26",
          action: FormatExpression
        },
        FormatExpressionToDisplay: {
          name: "\u683C\u5F0F\u5316\u8BA1\u7B97\u5F0F\uFF08Display\uFF09",
          description: "\u5C06\u8FD0\u7B97\u7B26\u7B49\u66FF\u6362\u4E3A\u6807\u51C6\u7684\u6570\u5B66\u7B26\u53F7",
          action: (input) => FormatExpression(input, true)
        }
      };
      this.workflows = {
        Markdown: {
          name: "Markdown \u6587\u672C\u5316",
          description: "\u5C06 Markdown \u8F6C\u6362\u4E3A\u7528 Emoji \u8FDB\u884C\u6807\u8BB0\u7684\u7EAF\u6587\u672C\u683C\u5F0F",
          actions: ["RemoveZeroWidthChars", "WhiteSpace", "CorrectCase", "EmojiMarkdown"]
        },
        Format: {
          name: "\u683C\u5F0F\u5316",
          description: "\u79FB\u9664\u96F6\u5BBD\u5B57\u7B26\u3001\u5728\u4E2D\u6587\u548C\u82F1\u6587/\u6570\u5B57\u4E4B\u95F4\u6DFB\u52A0\u7A7A\u683C",
          actions: ["RemoveZeroWidthChars", "WhiteSpace", "CorrectCase"]
        }
      };
      // 版本
      this.version = pkg.version;
      this.input = input || "";
    }
    /**
     * 执行单个处理方法
     * @param actionName 处理方法名称
     * @returns 处理后的结果
     */
    runAction(actionName) {
      return this.actions[actionName].action(this.input);
    }
    /**
     * 执行指定的工作流程
     * @param workflowName 工作流名称
     * @returns 按工作流中定义的动作顺序处理后的结果
     */
    runWorkflow(workflowName) {
      return this.chain(this.workflows[workflowName].actions);
    }
    /**
     * 链式调用多个处理方法
     * @param actions 处理方法数组
     * @returns 处理后的结果
     */
    chain(actions) {
      return actions.reduce((result, actionName) => {
        return this.actions[actionName].action(result);
      }, this.input);
    }
    /**
     * 获取所有可用的动作列表
     * @returns 包含所有可用动作信息的对象
     */
    getActions() {
      return Object.entries(this.actions).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          description: value.description
        };
        return acc;
      }, {});
    }
    /**
     * 获取所有可用的工作流列表
     * @returns 包含所有可用工作流信息的对象，每个工作流包含 name 和 description 属性
     */
    getWorkflows() {
      return Object.entries(this.workflows).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          description: value.description
        };
        return acc;
      }, {});
    }
  };
  return __toCommonJS(main_exports);
})();
//# sourceMappingURL=main.js.map
