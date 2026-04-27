import { Outlet } from "react-router-dom";
import FreebiePopup from "../common/freebie-popup/FreebiePopup";
import Footer from "../home-three/footer";
import Header from "../home-three/header";
function LayoutThree() {
	return (
		<>
			<FreebiePopup />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default LayoutThree;
