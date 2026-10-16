import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { assignShortNames, getShortName } from './mcp-server-names.ts'

describe('assignShortNames', () => {
  it('gives servers that share a last segment distinct names', () => {
    const names = assignShortNames(['com.example/mcp', 'org.example.tools/mcp', 'io.github.someone/weather'])

    assert.equal(names.get('com.example/mcp'), 'com-example-mcp')
    assert.equal(names.get('org.example.tools/mcp'), 'org-example-tools-mcp')
    assert.equal(new Set(names.values()).size, 3)
  })

  it('keeps the existing short name when only one server uses it', () => {
    const names = assignShortNames(['io.github.someone/weather', 'com.example/mcp', 'org.example/mcp'])

    assert.equal(names.get('io.github.someone/weather'), 'weather')
  })
})

describe('getShortName', () => {
  it('uses the slug-safe last path segment', () => {
    assert.equal(getShortName('io.github.Someone/My_Server'), 'my-server')
    assert.equal(getShortName('weather'), 'weather')
  })
})
