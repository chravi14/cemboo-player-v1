export function convertSrtToVtt(tracks: any[]) {
  var subtitle = {
    track: {
      src: undefined,
    },

    /**
     * Load the file from url
     *
     * @param {object}    track   - DOM <track /> object
     */
    load: function (track: any) {
      console.log(track.src);
      if (track.src && subtitle.isSrt(track.src)) {
        var client = new XMLHttpRequest();
        client.open("GET", track.src);
        client.onreadystatechange = function () {
          subtitle.convert(client.responseText).then((file: any) => {
            /**
             * Replace the srt file with the generated vtt file
             */
            subtitle.track.src = file;
          });
        };
        client.send();
      }
    },
    /**
     * Converts the SRT string to a VTT formatted string
     *
     * @param   {string}    content     - SRT string
     * @return  {object}    promise     - Returns a promise with the generated file as the return value
     */
    convert: function (content: any) {
      var promise = new Promise(function (resolve, reject) {
        /**
         * Replace all (,) commas with (.) dots. Eg: 00:00:01,144 -> 00:00:01.144
         */
        content = content.replace(/(\d+:\d+:\d+)+,(\d+)/g, "$1.$2");
        content = "WEBVTT - Generated using SRT2VTT\r\n\r\n" + content;

        /**
         * Convert content to a file
         */
        var blob = new Blob([content], { type: "text/vtt" });
        var file = window.URL.createObjectURL(blob);

        resolve(file);
      });

      return promise;
    },
    isSrt: function (filename: any) {
      return filename.split(".").pop().toLowerCase() === "srt" ? true : false;
    },
    isVTT: function (filename: any) {
      return filename.split(".").pop().toLowerCase() === "vtt" ? true : false;
    },
  };

  let convertedTracks = [];
  for (var i = 0; i < tracks.length; i++) {
    subtitle.load(tracks[i]);
    convertedTracks.push(subtitle.track);
  }

  return convertedTracks;
}
