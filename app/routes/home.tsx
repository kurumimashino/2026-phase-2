import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import type { Route } from "./+types/home"
import { loader as APIloader } from "./app/api/hello-react-router"

export async function loader() {
	const displayedmessage = APIloader()
	return { displayedmessage }
}

export default function TopPage({
	loaderData: { displayedmessage },
}: Route.ComponentProps) {
	return (
		<div>
			<h1>トップページ</h1>
			<div>{displayedmessage.message}</div>
			<Button asChild>
				<Link to="/auth/login">ログイン</Link>
			</Button>

			<Button asChild>
				<Link to="/auth/register">新規アカウント登録</Link>
			</Button>

			<Button asChild>
				<Link to="/app">アプリホーム</Link>
			</Button>
		</div>
	)
}
