var fs = require('fs');
var path = require('path');

var ANDROID_TABLE= ['-mdpi', '-hdpi', '-xhdpi', '-xxhdpi'];
var ANDROID_PREFIX= 'drawable';


fs.readdir('./', function(err, files) {
    for(var i in files) {
        try {
            fs.readdirSync(files[i]);

            var sliceFiles = fs.readdirSync(path.join(files[i], 'slices'));

            try {
                for(var k in ANDROID_TABLE) {
                    fs.mkdirSync(path.join(files[i], 'slices', ANDROID_PREFIX + ANDROID_TABLE[k]));
                }
                fs.mkdirSync(path.join(files[i], 'slices', 'iOS'));
            } catch(e) {
                // console.log(e);
            }

            for(var j in sliceFiles) {

                if(sliceFiles[j].indexOf('@') !== -1) {
                    fs.renameSync(path.join(files[i], 'slices', sliceFiles[j]), path.join(files[i], 'slices', 'iOS', sliceFiles[j]));
                } else {
                    for(var l in ANDROID_TABLE) {
                        if(sliceFiles[j].indexOf(ANDROID_TABLE[l] + '.png') !== -1) {
                            var filenames = sliceFiles[j].split("-");
                            filenames.pop();
                            var filename = filenames.join('-') + '.png';
                            console.log(path.join(files[i], 'slices', sliceFiles[j]), path.join(files[i], 'slices', ANDROID_PREFIX + ANDROID_TABLE[l], filename));
                            fs.renameSync(path.join(files[i], 'slices', sliceFiles[j]), path.join(files[i], 'slices', ANDROID_PREFIX + ANDROID_TABLE[l], filename));
                            break;
                        }
                    }
                }
            }
        } catch(e) {
            console.log(e);
        }
    }
});
