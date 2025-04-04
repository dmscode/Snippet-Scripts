import { CorrectCase } from '../actions/CorrectCase';

describe('CorrectCase', () => {
    describe('基本功能测试', () => {
        it('应该正确处理空字符串输入', () => {
            expect(CorrectCase('')).toBe('');
        });

        it('应该正确修正单个词汇的大小写', () => {
            expect(CorrectCase('obsidian')).toBe('Obsidian');
            expect(CorrectCase('OBSIDIAN')).toBe('Obsidian');
            expect(CorrectCase('ObSiDiAn')).toBe('Obsidian');
        });

        it('应该正确处理多个词汇组合', () => {
            const input = 'i use obsidian and vscode on my iphone';
            const expected = 'i use Obsidian and VS Code on my iPhone';
            expect(CorrectCase(input)).toBe(expected);
        });

        it('应该保持非词典词汇的原始大小写', () => {
            const input = 'My Custom App with Obsidian';
            const expected = 'My Custom App with Obsidian';
            expect(CorrectCase(input)).toBe(expected);
        });
    });

    describe('边界情况测试', () => {
        it('应该正确处理词汇在句子边界的情况', () => {
            expect(CorrectCase('obsidian.')).toBe('Obsidian.');
            expect(CorrectCase('(vscode)')).toBe('(VS Code)');
        });

        it('应该正确处理自定义词典', () => {
            const customDict = ['CustomApp', 'TestTool'];
            expect(CorrectCase('customapp and testtool', customDict))
                .toBe('CustomApp and TestTool');
        });

        it('应该正确处理包含特殊字符的文本', () => {
            const input = 'using obsidian!!! and vscode???';
            const expected = 'using Obsidian!!! and VS Code???';
            expect(CorrectCase(input)).toBe(expected);
        });

        it('应该正确处理包含特殊字符的文本', () => {
            const input = 'using notepad++!!! and notepad???';
            const expected = 'using Notepad++!!! and notepad???';
            expect(CorrectCase(input)).toBe(expected);
        });

        it('应该正确处理连续的词典词汇', () => {
            const input = 'obsidian vscode obsidian';
            const expected = 'Obsidian VS Code Obsidian';
            expect(CorrectCase(input)).toBe(expected);
        });
    });
});