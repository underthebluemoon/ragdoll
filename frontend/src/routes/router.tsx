/**
 * 라우터 - 주소(URL)와 화면 연결을 한곳에 모아 둠
 *
 * /                → 기본 화면: 폴더 페이지 루트 (폴더 안은 /?folder=<id>)
 * /docs/:docId     → 문서 탭
 * (나중에) /login   → 로그인 화면
 * 그 밖의 주소       → / 로 돌려보냄
 */

// library
import { createBrowserRouter, Navigate } from 'react-router'

// components
import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, element: null },                           // '/'  문서함
      { path: 'docs/:docId', element: null },    // '/docs/:docId' 문서 탭
    ],
  },

  // { path: '/login', Component: LoginPage },   // 로그인 화면 만들 때 추가

  // 없는 주소 → 문서함으로 (replace: 잘못된 주소를 방문 기록에 남기지 않음)
  { path: '*', element: <Navigate to="/" replace /> },
])
