function generateTagCloud(tags, minFontSize, maxFontSize) {
    var tagsCount = {};
    var divCloud = document.createElement('div');
    var spanTag = document.createElement('span');
    divCloud.id = 'cloud-container';

    for (var i = 0; i < tags.length; i++) {
        var currentTag = tags[i];
        currentTag = currentTag.toLowerCase();
        if (tagsCount[currentTag]) {
            tagsCount[currentTag] += 1;
        }
        else {
            tagsCount[currentTag] = 1;
        }
    }

    var maxOccurance = mostCommonTag(tagsCount);
    var fontSizeInterval = maxFontSize / maxOccurance;

    for (var key in tagsCount) {
        var tagFontSize = Math.round(tagsCount[key] * fontSizeInterval);
        if (tagFontSize < minFontSize) {
            tagFontSize = minFontSize;
        }

        var tag = spanTag.cloneNode(true);
        tag.innerHTML = key + " ";
        tag.style.fontSize = tagFontSize + 'px';
        divCloud.appendChild(tag);
    }

    return divCloud
}

function mostCommonTag(tagsCount) {
    var most = 0;

    for (var key in tagsCount) {
        var value = tagsCount[key];
        if (value > most) {
            most = value;
        }
    }
    return most;
}

function testTagCloud() {
    var tags = ["cms", "javascript", "js", "ASP.NET MVC", ".net",
        ".net", "css", "wordpress", "xaml", "js", "http", "web",
        "asp.net", "asp.net MVC", "ASP.NET MVC", "wp", "javascript",
        "js", "cms", "html", "javascript", "http", "http", "CMS"];
    var tagCloud = generateTagCloud(tags, 17, 42);
    document.body.appendChild(tagCloud);
}