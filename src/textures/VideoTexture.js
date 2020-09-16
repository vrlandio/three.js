import { RGBFormat, LinearFilter } from '../constants.js';
import { Texture } from './Texture.js';

function VideoTexture( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	Texture.call( this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.format = format !== undefined ? format : RGBFormat;

	this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
	this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;

	this.generateMipmaps = false;
        this.frameRate = 18;
        this.prevTime = 0;
}

VideoTexture.prototype = Object.assign( Object.create( Texture.prototype ), {

	constructor: VideoTexture,

	isVideoTexture: true,

	update: ( function () {

	//	this.prevTime = Date.now();

		return function () {

			var video = this.image;

			if ( video.readyState >= video.HAVE_CURRENT_DATA ) {

				var time = Date.now();

				if ( time - this.prevTime >= ( 1000 / this.frameRate ) ) {

					this.needsUpdate = true;
					this.prevTime = time;

				}

			}

		}

	} )()

} );


export { VideoTexture };
