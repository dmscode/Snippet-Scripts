import { RemoveZeroWidthChars } from '../actions/RemoveZeroWidthChars';

describe('RemoveZeroWidthChars', () => {
    describe('基本功能测试', () => {
        it('应该正确处理空字符串输入', () => {
            expect(RemoveZeroWidthChars('')).toBe('');
            expect(RemoveZeroWidthChars(null as any)).toBe('');
            expect(RemoveZeroWidthChars(undefined as any)).toBe('');
        });

        it('应该正确移除零宽字符', () => {
            const input = 'Hello\u200BWorld';
            expect(RemoveZeroWidthChars(input)).toBe('HelloWorld');
        });

        it('应该正确移除BOM标记', () => {
            const input = '\uFEFFHello';
            expect(RemoveZeroWidthChars(input)).toBe('Hello');
        });

        it('应该正确移除阿拉伯字母格式控制字符', () => {
            const input = 'Hello\u061CWorld';
            expect(RemoveZeroWidthChars(input)).toBe('HelloWorld');
        });

        it('应该正确移除不可见的连接符和格式控制字符', () => {
            const input = 'Hello\u2060World';
            expect(RemoveZeroWidthChars(input)).toBe('HelloWorld');
        });

        it('应该正确移除内嵌对象控制字符', () => {
            const input = 'Hello\uFFF9World\uFFFA';
            expect(RemoveZeroWidthChars(input)).toBe('HelloWorld');
        });
    });

    describe('边界情况测试', () => {
        it('应该正确处理包含多个零宽字符的文本', () => {
            const input = '\u200B\u200CHello\u200D\u200EWorld\u200F';
            expect(RemoveZeroWidthChars(input)).toBe('HelloWorld');
        });

        it('应该保留正常的Unicode字符', () => {
            const input = 'Hello 你好 World';
            expect(RemoveZeroWidthChars(input)).toBe('Hello 你好 World');
        });

        it('应该正确处理混合了多种控制字符的文本', () => {
            const input = '\uFEFF\u200BHello\u2060World\uFFF9!';
            expect(RemoveZeroWidthChars(input)).toBe('HelloWorld!');
        });

        it('应该正确处理只包含零宽字符的文本', () => {
            const input = '\u200B\u200C\u200D\u200E\u200F';
            expect(RemoveZeroWidthChars(input)).toBe('');
        });
    });
});