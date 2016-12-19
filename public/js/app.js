function load(link, callback) {
	oReq = new XMLHttpRequest();
	oReq.addEventListener('load', function() { callback.call(this); });
	oReq.open('GET', link);
	oReq.send();
}

function notFindStr(searchQuery) {
	let blackList = ['imageflake.com', 'gfycat', 'thnk1994.com', 'youtube.com', 'youtu.be', 'docs.google.com', 'flickr', 'instagram', '500px', 'pinkbike', '/a/', '/gallery/', '/r/'];
	for(let i = 0; i < blackList.length; i++) {
		if(searchQuery.indexOf(blackList[i]) > -1) { return false; }
	}
	return true;
}

function findExt(searchQuery) {
	let whiteList = ['.jpg', '.gifv', '.gif', '.png', 'shite.xyz', '.jpeg'];
	for(let i = 0; i < whiteList.length; i++) {
		if(searchQuery.indexOf(whiteList[i]) > -1) { return true; }
	}
	return false;
}

function loadSub(name) {
	document.getElementById('content').innerHTML = "";
	load(`https://www.reddit.com/r/${name}.json`, function() {
		let content = document.getElementById('content');
		let response = JSON.parse(this.responseText).data.children;
		for(let i = 0; i < response.length; i++) {
			let pass = 	(notFindStr(response[i].data.url)) &&
						(typeof response[i].data.preview === 'object');
			if(pass || response[i].data.domain === 'i.reddituploads.com') { getContent(i); }
		}
		function getContent(num) {
			// create elements
			let post = document.createElement('div');
			let aspect = document.createElement('div');
			let postContent = document.createElement('div');
			let imageLink = document.createElement('a');
			let image = document.createElement('div');
			let title = document.createElement('a');
			let stats = document.createElement('a');
			let snippet = document.createElement('a');
			let imgHref = getHref(num);
			let previewHref = imageonly => getPreview(response, num, imageonly).split('&amp;').join('\&');
			// assign values
			post.className = 'post';
			aspect.className = 'aspect';
			postContent.className = 'post-content';
			imageLink.className = 'post-image-link';
			image.className = 'post-image';
			title.className = 'post-title';
			stats.className = 'post-stats';
			snippet.className = 'post-snippet';
			imageLink.href = imgHref;
			imageLink.style.backgroundImage = `url(${previewHref(true)})`;
			image.style.backgroundImage = `url(${previewHref()})`;
			title.innerText = response[num].data.title;
			// append structure
			content.appendChild(post);
			post.appendChild(aspect);
			post.appendChild(postContent);
			postContent.appendChild(imageLink);
			imageLink.appendChild(image);
			postContent.appendChild(title);
		}
		function getHref(num) {
			let imgHref = (findExt(response[num].data.url)) ? 
			(response[num].data.url) : (`${response[num].data.url}.jpg`);
			imgHref = 	(imgHref.indexOf('.gifv') > -1) ? 
						(imgHref.substr(0, imgHref.length - 1)) : (imgHref);
			return imgHref.split('&amp;').join('\&');
		}
		function getPreview(response, num, imageOnly) {
			if(response[num].data.url.indexOf('reddituploads') > -1) {
				return response[num].data.url;
			}else{
				let images = response[num].data.preview.images[0];
				if(imageOnly) {
					return images.resolutions[0].url;
				}
				if(response[num].data.url.indexOf('.gif') > -1) {
					let gifs = images.variants.gif.resolutions;
					return (gifs[1].url.indexOf('.gifv') > -1) ?
					       (gifs[1].url.substr(0, imgHref.length - 1)) : 
					       (gifs[1].url);
				}else{
					return images.resolutions[2].url;
				}
			}
		}
	});
}

function loadRndSub() {
	let subreddits = ['cats', 'aww', 'scenery', 'EarthPorn', 'auroraporn', 'softwaregore', 'spaceporn', 'foodporn', 'grilledcheese', 'techsupportgore', 'firstworldanarchists', 'InterestingGIFs', 'NatureGifs', 'perfectloops', 'physicsgifs']
	loadSub(subreddits[Math.floor(Math.random() * (subreddits.length - 1))]);
}

document.getElementById('random').addEventListener('click', loadRndSub);
document.getElementById('app').addEventListener('click', function() {
	alert('You are here!')
});

loadRndSub();

//loadSub('physicsgifs');