import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  words, camelCase, snakeCase, kebabCase, titleCase, capitalize,
  slugify, truncate, padStart, padEnd, padCenter, repeat, reverse,
  isPalindrome, wordWrap, escapeHtml, unescapeHtml, template,
  countOccurrences, pluralize, similarity,
} from './strings.js';

describe('words', () => {
  it('splits', () => { assert.deepStrictEqual(words('hello world'), ['hello', 'world']); });
  it('camelCase input', () => { assert.deepStrictEqual(words('helloWorld'), ['hello', 'World']); });
});

describe('Case conversion', () => {
  it('camelCase', () => { assert.equal(camelCase('hello world'), 'helloWorld'); });
  it('snakeCase', () => { assert.equal(snakeCase('hello world'), 'hello_world'); });
  it('kebabCase', () => { assert.equal(kebabCase('hello world'), 'hello-world'); });
  it('titleCase', () => { assert.equal(titleCase('hello world'), 'Hello World'); });
  it('capitalize', () => { assert.equal(capitalize('hello'), 'Hello'); });
  it('from camelCase', () => { assert.equal(snakeCase('helloWorld'), 'hello_world'); });
});

describe('slugify', () => {
  it('basic', () => { assert.equal(slugify('Hello World!'), 'hello-world'); });
  it('special chars', () => { assert.equal(slugify('  Hello   World  '), 'hello-world'); });
});

describe('truncate', () => {
  it('short string', () => { assert.equal(truncate('hi', 10), 'hi'); });
  it('long string', () => { assert.equal(truncate('hello world', 8), 'hello...'); });
  it('custom suffix', () => { assert.equal(truncate('hello world', 8, '…'), 'hello w…'); });
});

describe('padding', () => {
  it('padStart', () => { assert.equal(padStart('42', 5, '0'), '00042'); });
  it('padEnd', () => { assert.equal(padEnd('hi', 5, '.'), 'hi...'); });
  it('padCenter', () => { assert.equal(padCenter('hi', 6, '-'), '--hi--'); });
});

describe('repeat/reverse', () => {
  it('repeat', () => { assert.equal(repeat('ab', 3), 'ababab'); });
  it('reverse', () => { assert.equal(reverse('hello'), 'olleh'); });
  it('reverse emoji', () => { assert.equal(reverse('ab'), 'ba'); });
});

describe('isPalindrome', () => {
  it('palindrome', () => { assert.ok(isPalindrome('racecar')); });
  it('with spaces', () => { assert.ok(isPalindrome('A man a plan a canal Panama')); });
  it('not palindrome', () => { assert.ok(!isPalindrome('hello')); });
});

describe('wordWrap', () => {
  it('wraps', () => {
    const result = wordWrap('the quick brown fox jumps over the lazy dog', 15);
    assert.ok(result.includes('\n'));
    assert.ok(result.split('\n').every(line => line.length <= 15));
  });
});

describe('HTML escape', () => {
  it('escapeHtml', () => { assert.equal(escapeHtml('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'); });
  it('unescapeHtml', () => { assert.equal(unescapeHtml('&lt;b&gt;hi&lt;/b&gt;'), '<b>hi</b>'); });
  it('roundtrip', () => { assert.equal(unescapeHtml(escapeHtml('<p>"test"</p>')), '<p>"test"</p>'); });
});

describe('template', () => {
  it('replaces variables', () => { assert.equal(template('Hello {{name}}!', { name: 'Alice' }), 'Hello Alice!'); });
  it('multiple', () => { assert.equal(template('{{a}} + {{b}}', { a: '1', b: '2' }), '1 + 2'); });
  it('missing key', () => { assert.equal(template('{{x}}', {}), ''); });
});

describe('countOccurrences', () => {
  it('counts', () => { assert.equal(countOccurrences('banana', 'an'), 2); });
  it('no match', () => { assert.equal(countOccurrences('hello', 'xyz'), 0); });
});

describe('pluralize', () => {
  it('regular', () => { assert.equal(pluralize('cat', 2), 'cats'); });
  it('singular', () => { assert.equal(pluralize('cat', 1), 'cat'); });
  it('es ending', () => { assert.equal(pluralize('box', 2), 'boxes'); });
  it('y ending', () => { assert.equal(pluralize('city', 2), 'cities'); });
  it('vowel y', () => { assert.equal(pluralize('day', 2), 'days'); });
});

describe('similarity', () => {
  it('identical', () => { assert.equal(similarity('hello', 'hello'), 1); });
  it('similar', () => { assert.ok(similarity('hello', 'hallo') > 0.5); });
  it('different', () => { assert.ok(similarity('abc', 'xyz') < 0.5); });
});
