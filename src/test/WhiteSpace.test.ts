import { WhiteSpace } from '../actions/WhiteSpace';

describe('WhiteSpace 函数测试', () => {
    describe('基本功能测试', () => {
        it('应该正确处理空字符串输入', () => {
            expect(WhiteSpace('')).toBe('');
        });

        it('应该在中文和英文之间添加空格', () => {
            expect(WhiteSpace('你好world')).toBe('你好 world');
            expect(WhiteSpace('world你好')).toBe('world 你好');
        });

        it('应该在中文和数字之间添加空格', () => {
            expect(WhiteSpace('价格123元')).toBe('价格 123 元');
            expect(WhiteSpace('123个苹果')).toBe('123 个苹果');
        });

        it('应该正确处理多个中英文混合场景', () => {
            const input = '我在使用Obsidian和VSCode编程';
            const expected = '我在使用 Obsidian 和 VSCode 编程';
            expect(WhiteSpace(input)).toBe(expected);
        });

        it('应该保持原有的空格不变', () => {
            const input = '你好 world 123 测试';
            expect(WhiteSpace(input)).toBe(input);
        });

        it('应该正确处理特殊字符', () => {
            expect(WhiteSpace('Hello你好!world')).toBe('Hello 你好!world');
            expect(WhiteSpace('测试test测试')).toBe('测试 test 测试');
        });
    });
});