import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SignupPage from "../pages/SignupPage"

export {}

describe("회원가입 테스트", () => {
	beforeEach(() => {
		
	})
	test("비밀번호와 비밀번호 확인이 일치하지 않으면 alert 창이 나타난다.", async () => {
		// given - 회원가입 페이지
		const routes = [
			{
				path: '/signup',
				element: <SignupPage />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ['/signup'],
			initialIndex: 0,
		});

		render(
			<RouterProvider router={router} />
		);

		// when - 비밀번호와 비밀번호 확인 값이 일치하지 않음
		const pwInput = screen.getByLabelText('비밀번호');
		const confirmPWInput = screen.getByLabelText('비밀번호 확인');

		fireEvent.change(pwInput, { target: { value: "password" } });
		fireEvent.change(confirmPWInput, { target: { value: "wrond-password" } })

		// then - 에러 메세지가 표시됨
		
		const errMessage = await screen.findByTestId("error-message");
		expect(errMessage).toBeInTheDocument();
	})

	test("인풋 입력에 따른 회원가입 버튼 활성화", () => {
		// given - 회원가입 페이지
		const routes = [
			{
				path: '/signup',
				element: <SignupPage />,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ['/signup'],
			initialIndex: 0,
		});

		render(
			<RouterProvider router={router} />
		);

		const signupButton = screen.getByRole("button", { name: "회원가입" });
		expect(signupButton).toBeDisabled();

		// when - 닉네임 입력, 비밀번호 확인 일치
		const nickNameInput = screen.getByLabelText('닉네임');
		const pwInput = screen.getByLabelText('비밀번호');
		const confirmPWInput = screen.getByLabelText('비밀번호 확인');

		fireEvent.change(nickNameInput, { target: { value: "activated" } });
		fireEvent.change(pwInput, { target: { value: "password" } });
		fireEvent.change(confirmPWInput, { target: { value: "password" } })

		// then - 회원가입 버튼 활성화
		
		expect(signupButton).toBeEnabled();
	})
})