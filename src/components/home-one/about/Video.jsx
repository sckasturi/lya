import { useState } from "react";
import ModalVideo from "react-modal-video";
const PlayBtnImg = null;
const VideoBg = null;
import FadeInUp from "../../animation/FadeInUp";

function Video() {
	const [isOpen, setOpen] = useState(false);

	return (
		<FadeInUp className="aximo-video-wrap">
			<img src={VideoBg} alt="VideoBg" />
			<ModalVideo
				channel="youtube"
				youtube={{ autoplay: 0 }}
				isOpen={isOpen}
				videoId="Vx2aLNgGoAE"
				onClose={() => setOpen(false)}
			/>
			<button className="aximo-video-popup play-btn1 video-init" onClick={() => setOpen(true)}>
				<img src={PlayBtnImg} alt="PlayBtnImg" />
			</button>
		</FadeInUp>
	);
}

export default Video;
