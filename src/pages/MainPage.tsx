import { useNavigate } from "react-router-dom"

export default function MainPage() {
	const navigate = useNavigate()

	return <button onClick={() => navigate('/signup')}>회원가입 하러가기</button>
}