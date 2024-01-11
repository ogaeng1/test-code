import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function SignupPage() {
	const [nickName, setNickName] = useState("");
	const [pw, setPW] = useState("");
	const [confirmPW, setConfirmPW] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (pw !== confirmPW) {
			alert('비밀번호가 일치하지 않습니다.')
		} else {
			sessionStorage.setItem('닉네임', nickName);
			setIsSuccess(true);
		}
	}

	useEffect(() => {
		if (isSuccess) {
			alert('회원가입 완료!!')
			navigate("/login");
		}
	}, [isSuccess])

	return (
		<Wrapper>
			<Title>회원가입</Title>
			<InputSection>
				<InputWrapper>
					<Label htmlFor="nickname">닉네임</Label>
					<Input
						id="nickname"
						type="text"
						placeholder="닉네임을 입력하세요"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setNickName(e.target.value)}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="password">비밀번호</Label>
					<Input 
						id="password"
						type="password"
						placeholder="비밀번호를 입력하세요"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPW(e.target.value)}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="confirm">비밀번호 확인</Label>
					<Input 
						id="confirm"
						type="password"
						placeholder="한번 더 입력"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPW(e.target.value)}
					/>
				</InputWrapper>
			</InputSection>
			{pw !== confirmPW && (
				<Error data-testid="error-message">
					비밀번호가 일치하지 않습니다.
				</Error>
			)}
			<Button
				disabled={!nickName || !pw || pw !== confirmPW}
				onClick={() => handleSubmit()}
			>
				회원가입
			</Button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	padding: 0 30px;
`;

const Title = styled.header`
	margin-top: 24px;
	font-size: 24px;
	color: var(--primary);
`;

const InputSection = styled.section`
	margin-top: 50px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 50px;
`;

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Label = styled.label`
	font-size: 20px;
	margin-right: 10px;
`;

const Input = styled.input`
	font-size: 20px;
	width: 30%;
	border: none;
	border-bottom: 1px solid black;
	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	width: 200px;
	height: 40px;
	border-radius: 4px;
	margin-top: 30px;
	background-color: ${(props) =>
		props.disabled ? "var(--noactivate)" : "var(--activate)"};
	color: ${(props) => props.disabled ? "var(--white)" : "#00000"}
`;

const Error = styled.p`
		font-size: 16px;
		color: red;
		margin-top: 5px;
`;