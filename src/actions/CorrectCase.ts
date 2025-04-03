// 定义一个包含需要保持正确大小写的词汇表
const CASE_SENSITIVE_WORDS = [
    'AI',
    'Obsidian',
    'Excalidraw',
    'Notion',
    'Roam Research',
    'Logseq',
    'Typora',
    'iOS',
    'iPad',
    'iPhone',
    'Android',
    'MacOS',
    'Windows',
    'Linux',
    'Ubuntu',
    'Fedora',
    'Debian',
    'CentOS',
    'openSUSE',
    'Arch',
    'Gentoo',
    'VS Code',
    'Sublime Text',
    'Atom',
    'Vim',
    'Emacs',
    'Neovim',
    'Trae',
    'Cursor',
    'Zettlr',
];

/**
 * 创建一个词汇映射表，用于存储单词的正确大小写形式
 * @param dict 包含正确大小写的单词数组
 * @returns 返回一个Map对象，key为小写单词，value为正确大小写形式
 */
const wordMap = (dict:string[]):Map<string, string> => {
    const map = new Map<string, string>();
    dict.forEach(word => {
        // 添加原始小写形式
        map.set(word.toLowerCase(), word);
        // 添加无空格变体
        if(word.match(/\s+/)) map.set(word.toLowerCase().replace(/\s+/g, ''), word);
    });
    return map;
};

/**
 * 修正文本中特定词汇的大小写
 * @param input 输入的文本字符串
 * @returns 修正后的文本字符串
 */
export function CorrectCase(input: string, dict: string[] = CASE_SENSITIVE_WORDS): string {
    // 如果输入为空，直接返回空字符串
    if (!input) return '';
    // 创建一个词汇映射表
    const dictMap = wordMap(dict);
    // 使用正则表达式匹配并替换特定词汇
    const pattern = new RegExp(`\\b(${Array.from(dictMap.keys()).join('|')})\\b`, 'gi');
    return input.replace(pattern, match => dictMap.get(match.toLowerCase()) || match);
}