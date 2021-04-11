/*
 * @Author: mashaoze
 * @Date: 2020-07-11 10:52:38
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-10-23 08:50:37
 */
// SQL example
// a == 1 AND (b == 3 OR c != 5) AND d == 7
const operations = ['==', '<', '>', '<=', '>=', '!=', 'like', 'in', 'nin'];

export default {
  // 判断字符串中括号是否平衡匹配的函数
  isBracketBalance: function(str) {
    let leftBracketNum = 0; // 用于保存左括号个数的变量
    let strLength = str.length; // 把字符串的长度付给一个变量增加程序的性能

    // 通过 for 循环来读取字符串中的一个一个的字符
    for (let i = 0; i < strLength; i++) {
      let temp = str.charAt(i); // 付给临时变量增加程序的性能
      if (temp === '(') {
        // 如果是左括号，则 leftBracketNum++
        leftBracketNum++;
      }
      if (temp === ')') {
        // 如果是右括号，则 leftBracketNum--
        leftBracketNum--;
      }
    }

    // 最后判断 leftBracketNum，如果为 0 表示平衡否则不平衡
    if (leftBracketNum === 0) {
      return true;
    }
    return false;
  },

  // Replace all variables with what the variable is supposed to look like
  replace_variables: function(string, variable) {
    let new_string = '';

    // Loop through the string, and if there is any brackets, put a space before and after
    for (let i = 0; i < string.length; i++) {
      if (string[i] == '(' || string[i] == ')') {
        new_string += ' ' + string[i] + ' ';
      } else {
        new_string += string[i];
      }
    }

    let splits = new_string.split(' ').filter(x => x !== '');

    // replace all variables with the variables
    // A variable is found if the next in the splits is an operation
    for (let i = 0; i < splits.length; i++) {
      if (operations.includes(splits[i])) {
        // If the variable is called this, we don't want to change it then
        if (splits[i - 1] != 'this') {
          splits[i - 1] = variable + '.' + splits[i - 1];
        } else {
          splits[i - 1] = variable;
        }
      }
      // to function
      if (operations.includes(splits[i])) {
        splits.splice(i - 1, 3, `_query(${splits[i - 1]}, '${splits[i]}', ${splits[i + 1]})`);
        i -= 2;
      }
    }

    string = splits.join(' ');

    return string;
  }
};
