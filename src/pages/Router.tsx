import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SignupPage from "./SignupPage";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Routes>
		</BrowserRouter>
	)
}