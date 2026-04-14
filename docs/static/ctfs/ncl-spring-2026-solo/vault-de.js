const cs_S = (function () {
    let a = true
    return function (b, c) {
      const d = a
        ? function () {
            if (c) {
              const e = c.apply(b, arguments)
              return (c = null), e
            }
          }
        : function () {}
      return (a = false), d
    }
  })(),
  cs_T = cs_S(this, function () {
    return cs_T
      .toString()
      .search('(((.+)+)+)+$')
      .toString()
      .constructor(cs_T)
      .search('(((.+)+)+)+$')
  })
cs_T()
const cs_U = (function () {
  let d = true
  return function (e, f) {
    const i = d
      ? function () {
          if (f) {
            const j = f.apply(e, arguments)
            return (f = null), j
          }
        }
      : function () {}
    return (d = false), i
  }
})()
;(function () {
  cs_U(this, function () {
    const d = new RegExp('function *\\( *\\)'),
      e = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
      f = cs_Z('init')
    !d.test(f + 'chain') || !e.test(f + 'input') ? f('0') : cs_Z()
  })()
})()
function cs_V() {
  let a = String.fromCharCode(83)
  return (
    (a += String.fromCharCode(75)),
    (a += String.fromCharCode(89)),
    (a += String.fromCharCode(45)),
    a
  )
}
async function cs_W() {
  try {
    const b = await fetch('favicon.png')
    if (!b.ok) {
      throw new Error('HTTP error! Status: ' + b.status)
    }
    const c = await b.arrayBuffer(),
      d = new Uint8Array(c)
    for (let h = 0; h < d.length; h++) {
      d[h] = d[h] % d[d.length - 1 - h]
    }
    const e = Math.floor(d.length / 2),
      f = d[e],
      g = Array.from(d.slice(f)).concat(Array.from(d.slice(0, f)))
    return d.set(g), d
  } catch (k) {
    return (
      console.error(
        'Could not fetch. If you see this message and you did not modify the source code, contact an admin:',
        k
      ),
      new Uint8Array(0)
    )
  }
}
async function cs_X() {
  const b = await cs_W(),
    c = b.length
  let e = '',
    f = '',
    h = function (k) {
      return /^[A-Z]$/i.test(k)
    },
    j = function (k) {
      return /^[0-9]$/.test(k)
    }
  for (let k = 42; k < c; k++) {
    if (h(String.fromCharCode(b[k])) && e.length < 4) {
      e += String.fromCharCode(b[k])
    } else {
      j(String.fromCharCode(b[k])) &&
        f.length < 4 &&
        (f += String.fromCharCode(b[k]))
    }
  }
  return e.toUpperCase() + '-' + f
}
async function cs_Y(a) {
  let c = (d) => {
    let g = ''
    for (let h = 0; h < d.length; h += 3) {
      try {
        const j = parseInt(d.slice(h, h + 3), 8)
        g += String.fromCharCode(j)
      } catch (k) {
        document.getElementById('display').textContent = 'INCORRECT'
        document.getElementById('display').style.color = 'red'
        return
      }
    }
    return g
  }
  a = c(a)
  a === cs_V() + (await cs_X())
    ? ((document.getElementById('wheel').className += ' spinning'),
      (document.getElementById('display').textContent = a))
    : ((document.getElementById('display').textContent = 'INCORRECT'),
      (document.getElementById('display').style.color = 'red'))
}
document.addEventListener('DOMContentLoaded', () => {
  const d = new URL(window.location.href)
  if (d.searchParams.has('key')) {
    const f = d.searchParams.get('key')
    ;(async () => {
      await cs_Y(f)
    })()
  }
  const e = document.querySelectorAll('button')
  e.forEach((g) => {
    g.addEventListener('click', () => {
      const h = g.value
      document.getElementById('display').style.color = '#0f0'
      if (h === 'CLEAR') {
        d.searchParams.delete('key')
        window.history.pushState({}, '', d)
        document.getElementById('display').textContent = ''
      } else {
        h === 'ENTER'
          ? (window.location.href = d.toString())
          : (d.searchParams.has('key')
              ? (d.searchParams.set('key', d.searchParams.get('key') + h),
                (document.getElementById('display').textContent = '*'.repeat(
                  d.searchParams.get('key').length
                )))
              : (d.searchParams.append('key', h),
                (document.getElementById('display').textContent = '*'.repeat(
                  d.searchParams.get('key').length
                ))),
            window.history.pushState({}, '', d))
      }
    })
  })
})
function cs_Z(a) {
  function c(d) {
    if (typeof d === 'string') {
      return function (g) {}.constructor('while (true) {}').apply('counter')
    } else {
      if (('' + d / d).length !== 1 || d % 20 === 0) {
        ;(function () {
          return true
        }
          .constructor('debugger')
          .call('action'))
      } else {
        ;(function () {
          return false
        }
          .constructor('debugger')
          .apply('stateObject'))
      }
    }
    c(++d)
  }
  try {
    if (a) {
      return c
    } else {
      c(0)
    }
  } catch (e) {}
}
