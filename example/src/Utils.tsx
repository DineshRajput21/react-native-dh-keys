export function decimalToHexa(bn) {
    var pos = true;
    bn = BigInt(bn);
    if (bn < 0) {
      pos = false;
      bn = bitnot(bn);
    }
    var base = 16;
    var hex = bn.toString(base);
    if (hex.length % 2) {
      hex = '0' + hex;
    }
    // Check the high byte _after_ proper hex padding
    var highbyte = parseInt(hex.slice(0, 2), 16);
    var highbit = (0x80 & highbyte);

    if (pos && highbit) {
      // A 32-byte positive integer _may_ be
      // represented in memory as 33 bytes if needed
      hex = '00' + hex;
    }
    return hex;
  }

  function bitnot(bn) {
    // JavaScript's bitwise not doesn't work on negative BigInts (bn = ~bn; // WRONG!)
    // so we manually implement our own two's compliment (flip bits, add one)
    bn = -bn;
    var bin = (bn).toString(2)
    var prefix = '';
    while (bin.length % 8) {
      bin = '0' + bin;
    }
    if ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) {
      prefix = '11111111';
    }
    bin = bin.split('').map(function (i) {
      return '0' === i ? '1' : '0';
    }).join('');
    return BigInt('0b' + prefix + bin) + BigInt(1);
  }

   export function hexaToDecimal(s) {

    function add(x, y) {
      var c = 0,
        r = [];
      var x = x.split('').map(Number);
      var y = y.split('').map(Number);
      while (x.length || y.length) {
        var s = (x.pop() || 0) + (y.pop() || 0) + c;
        r.unshift(s < 10 ? s : s - 10);
        c = s < 10 ? 0 : 1;
      }
      if (c) r.unshift(c);
      return r.join('');
    }

    var dec = '0';
    s.split('').forEach(function (chr) {
      var n = parseInt(chr, 16);
      for (var t = 8; t; t >>= 1) {
        dec = add(dec, dec);
        if (n & t) dec = add(dec, '1');
      }
    });
    return dec;
  }