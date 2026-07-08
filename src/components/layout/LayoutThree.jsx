import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../home-three/footer";
import Header from "../home-three/header";

const FreebiePopup = lazy(() => import("../common/freebie-popup/FreebiePopup"));

function LayoutThree() {
	return (
		<>
			<Suspense fallback={null}>
				<FreebiePopup />
			</Suspense>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default LayoutThree;
