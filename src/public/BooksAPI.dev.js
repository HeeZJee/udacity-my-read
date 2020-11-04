"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.update = exports.getAll = exports.get = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var api = "https://reactnd-books-api.udacity.com"; // Generate a unique token for storing your bookshelf data on the backend server.

var token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);
var headers = {
  'Accept': 'application/json',
  'Authorization': token
};

var get = function get(bookId) {
  return fetch("".concat(api, "/books/").concat(bookId), {
    headers: headers
  }).then(function (res) {
    return res.json();
  })(_templateObject()).then(function (data) {
    return data.book;
  });
};

exports.get = get;

var getAll = function getAll() {
  return fetch("".concat(api, "/books"), {
    headers: headers
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data.books;
  });
};

exports.getAll = getAll;

var update = function update(book, shelf) {
  return fetch("".concat(api, "/books/").concat(book.id), {
    method: 'PUT',
    headers: _objectSpread({}, headers, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      shelf: shelf
    })
  }).then(function (res) {
    return res.json();
  });
};

exports.update = update;

var search = function search(query) {
  return fetch("".concat(api, "/search"), {
    method: 'POST',
    headers: _objectSpread({}, headers, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      query: query
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data.books;
  });
};

exports.search = search;