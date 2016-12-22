function loadSub(name, loadingNewSub) {
	let content = document.getElementById('content');
	let loadLink = `https://www.reddit.com/r/${name}.json`;
	currentSub = name;
	if(loadingNewSub) {
		tempAlert(`Welcome to /r/${currentSub}`, 2000);
		document.getElementById('content').innerHTML = "";
	}else{
		loadLink += `?after=${lastPost}`;
		let footerSpace = document.getElementById('footer-space');
		if(scrollConfirm) {
			content.removeChild(footerSpace);
			scrollConfirm = false;
		}
	}
	load(loadLink, function() {
		let response = JSON.parse(this.responseText).data.children;
		for(let i = 0; i < response.length; i++) {
			let pass = 	(notFindStr(response[i].data.url)) &&
						(typeof response[i].data.preview === 'object');
			if(pass || response[i].data.domain === 'i.reddituploads.com') { getContent(i); }
			if(i === response.length - 1) {
				lastPost = response[i].data.name;
			}
		}
		document.getElementById('content').innerHTML += "<div id = 'footer-space'></div>";
		function getContent(num) {
			// create elements
			let post = document.createElement('div');
			let aspect = document.createElement('div');
			let postContent = document.createElement('div');
			let imageLink = document.createElement('a');
			let imageAspect = document.createElement('div');
			let image = document.createElement('div');
			let title = document.createElement('a');
			let stats = document.createElement('a');
			let snippet = document.createElement('a');
			let imgHref = getHref(num);
			let previewHref = imageonly => getPreview(response, num, imageonly).split('&amp;').join('&');
			let author = response[num].data.author;
			let upboats = response[num].data.ups;
			let postTime = response[num].data.created_utc;
			let timeDiff = calcTimeDiff(postTime, -10);
			// assign values
			post.className = 'post';
			aspect.className = 'aspect';
			postContent.className = 'post-content';
			imageLink.className = 'post-image-link';
			imageAspect.className = 'post-image-aspect';
			image.className = 'post-image';
			title.className = 'post-title';
			stats.className = 'post-stats';
			snippet.className = 'post-snippet';
			// append structure
			content.appendChild(post);
			post.appendChild(aspect);
			post.appendChild(postContent);
			postContent.appendChild(imageLink);
			imageLink.appendChild(imageAspect);
			imageLink.appendChild(image);
			postContent.appendChild(title);
			postContent.appendChild(stats);
			postContent.appendChild(snippet);
			// load content
			imageLink.href = imgHref;
			imageLink.style.backgroundImage = `url(${previewHref(true)})`;
			image.style.backgroundImage = `url(${previewHref()})`;
			title.innerText = response[num].data.title;
			title.href = "http://www.reddit.com" + response[num].data.permalink;
			stats.innerHTML = `by ${author} &nbsp; ● &nbsp; ${timeDiff} &nbsp; ● &nbsp; ${upboats} upboats`;
			stats.href = 'http://www.reddit.com/u/' + author;
			snippet.innerText = response[num].data.selftext;
		}
		function getHref(num) {
			let imgHref = (findExt(response[num].data.url)) ? 
			(response[num].data.url) : (`${response[num].data.url}.jpg`);
			imgHref = 	(imgHref.indexOf('.gifv') > -1) ? 
						(imgHref.substr(0, imgHref.length - 1)) : (imgHref);
			return imgHref.split('&amp;').join('\&');
		}
		function getPreview(response, num, fallback) {

			if(response[num].data.url.indexOf('reddituploads') > -1) {
				return response[num].data.url;
			}else{
				let images = response[num].data.preview.images[0];
				if(fallback) {
					return images.resolutions[0].url;
				}
				if(response[num].data.url.indexOf('.gif') > -1) {
					let gifs = images.variants.gif.resolutions;
					return gifs[gifs.length - 1].url.split('gifv').join('gif');
				}else{
					return images.resolutions[images.resolutions.length - 1].url;
				}
			}
		}
	});
}

function loadRndSub() {
	let subreddits = ['cats', 'aww', 'scenery', 'EarthPorn', 'auroraporn', 'softwaregore', 'spaceporn', 'foodporn', 'grilledcheese', 'techsupportgore', 'firstworldanarchists', 'InterestingGIFs', 'NatureGifs', 'perfectloops', 'physicsgifs'];
	let newSub = subreddits[Math.floor(Math.random() * (subreddits.length - 1))];
	lastPost = "";
	loadSub(newSub, true);
}