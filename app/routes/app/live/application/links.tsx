import { CopyIcon } from "lucide-react"
import type { useFetcher } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { formatPlainDateTime } from "~/lib/plain-datetime-utils"
import type { LiveApplicationWithUrl } from "."
//コンポーネント２，３つ目（propsで分けたため合体）
export function Links({
	ApplicationsWithUrl,
	fetcher2,
	handleCopy,
	link,
	icon,
	linkstate,
}: {
	ApplicationsWithUrl: LiveApplicationWithUrl[]
	fetcher2: ReturnType<typeof useFetcher>
	handleCopy: (url: string) => Promise<void>
	link: string
	icon: React.ReactNode
	linkstate: string
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex gap-1 items-center">{link}リンク</CardTitle>
			</CardHeader>
			<CardContent>
				{ApplicationsWithUrl.length === 0 ? (
					<span className="text-muted-foreground text-sm">
						{link}リンクはありません
					</span>
				) : (
					<div className="space-y-4">
						{ApplicationsWithUrl.map((apl) => (
							<div className="space-y-1" key={apl.id}>
								<div className="w-full flex items-baseline gap-2">
									<span className="shrink-0">{apl.name}</span>
									<span className="shrink-0 text-muted-foreground text-xs">
										{formatPlainDateTime(apl.updatedAt)}
									</span>
								</div>
								<div className="flex gap-2 items-center">
									<div className="grow truncate text-muted-foreground py-2 px-4 bg-muted rounded-lg">
										{apl.url}
									</div>
									<Button
										size="icon-lg"
										variant="destructive"
										onClick={() => {
											const formData = new FormData()
											formData.append("intent", `${linkstate}-application`)
											formData.append("application-id", String(apl.id))
											fetcher2.submit(formData, { method: "POST" })
										}}
									>
										{icon}
									</Button>
									<Button
										size="icon-lg"
										className="w-16"
										onClick={() => handleCopy(apl.url)}
									>
										<CopyIcon />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)
}
