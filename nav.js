
// 初始化数据

var initiatedData = init()
var keys = initiatedData['keys']
var websiteNames = initiatedData['websiteNames']

//生成键盘

generateKeyboards(keys, websiteNames)

//监听键盘事件

listenToUsers(websiteNames)

//工具函数

function init() {
	var keys = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['z', 'x', 'c', 'v', 'b', 'n', 'm']
	]

	var websiteNames = {
		q : 'qq.com',
		w : 'weibo.com',
		y : 'youtube.com',
		a : 'alibaba.com',
		d : 'duckduckgo.com',
		g : 'google.com',
		z : 'zhihu.com',
		v : 'v2ex.com',
		b : 'baidu.com',
		h : 'news.ycombinator.com',
		i : 'indiehackers.com'
	}

	// 取出localStorage里面的'stored'

	var websitesInStorage = getFromLocalStorage('stored')

	if (websitesInStorage) {
		websiteNames = websitesInStorage
	}

	return {
		keys: keys,
		websiteNames: websiteNames
	}

}


function getFromLocalStorage (name) {
	return JSON.parse(localStorage.getItem(name) || 'null')
}

function create(tag, attributes) {
	var element = document.createElement(tag)

	for (key in attributes) {
		element[key] = attributes[key]
	}

	return element
}

function createImg(domain) {
	var img = document.createElement('img')
	if (domain) {
		img.src = 'http://' + domain + '/favicon.ico'
	} else {
		img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
	}
	img.onerror = function(wrong) {
		wrong.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
	}
	return img
}

function generateKeyboards(keys, websiteNames) {
	for (var i = 0; i < keys.length; i++) { // 0, 1, 2

		var div = create('div', {
			className: 'row'
		})
		container.appendChild(div)

		for (var j = 0; j < keys[i].length; j++) {
			var kbd = create('kbd', {
				className: 'keyStyle'
			})
			var span = create('span', {
				className: 'text',
				textContent: keys[i][j]
			})
			var editButton = create('button', {
				id: keys[i][j],
				textContent: 'E'
			})
			var img = createImg(websiteNames[keys[i][j]])

			div.appendChild(kbd)
			kbd.appendChild(span)
			kbd.appendChild(editButton)
			kbd.appendChild(img)


			editButton.onclick = function(edit) {
				var gotButton = edit.target
				var newImage = gotButton.nextSibling

				var key = edit.target.id
				var editWebsite = prompt('给我一个网址')
				if (editWebsite) {
					websiteNames[key] = editWebsite
					localStorage.setItem('stored', JSON.stringify(websiteNames))
				}

				newImage.src = 'http://' + editWebsite + '/favicon.ico'

				newImage.onerror = function(wrong) {
					wrong.target.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png"
				}


			}

		}

	}
}



function listenToUsers(websiteNames) {

	document.onkeypress = function(e) {
		var typedKey = e['key']

		var oneWebsite = websiteNames[typedKey]
		// location.href = 'http://' + oneWebsite

		window.open('http://' + oneWebsite, '_blank')
	}
}


