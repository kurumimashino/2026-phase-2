import { ChevronsUpDownIcon, LoaderCircleIcon, SendIcon } from "lucide-react"
import { useRef } from "react"
import type { useFetcher } from "react-router"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Switch } from "~/components/ui/switch"

//コンポーネント一つ目の関数
export function CreateApplicationUrl({
	initialAvailability,
	setInitialAvailability,
	openCreateDialog,
	setOpenCreateDialog,
	fetcher1,
}: {
	initialAvailability: boolean
	setInitialAvailability: (value: boolean) => void
	openCreateDialog: boolean
	setOpenCreateDialog: (value: boolean) => void
	fetcher1: ReturnType<typeof useFetcher>
}) {
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-2xl font-semibold">バンドの募集</h1>
				<p className="text-muted-foreground text-sm">
					参加を希望するバンドにこのURLを共有してください
				</p>
			</div>
			<Collapsible>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-between items-center">
							<div>新しいバンド募集リンクを作成</div>
							<CollapsibleTrigger asChild>
								<Button size="icon" variant="ghost">
									<ChevronsUpDownIcon />
								</Button>
							</CollapsibleTrigger>
						</CardTitle>
					</CardHeader>
					<CollapsibleContent asChild>
						<CardContent>
							<fetcher1.Form method="POST" ref={formRef}>
								<input type="hidden" name="intent" value="create" />
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="application-name">
											募集分類名（任意）
										</FieldLabel>
										<FieldDescription>
											ライブ管理者の識別のためにのみ使用します。外部へ公開されません。
										</FieldDescription>
										<Input
											id="application-name"
											name="application-name"
											placeholder="例：一次募集"
										/>
									</Field>
									<Field>
										<FieldLabel>初期設定</FieldLabel>
										<div className="inline-flex gap-2">
											<Switch
												id="available"
												checked={initialAvailability}
												onCheckedChange={setInitialAvailability}
											/>
											<input
												type="hidden"
												name="initial-available"
												value={Number(initialAvailability)}
											/>
											<FieldLabel htmlFor="available">停止・有効</FieldLabel>
										</div>
									</Field>
									<Field>
										<Button
											type="button"
											className="w-full"
											onClick={() => setOpenCreateDialog(true)}
											disabled={fetcher1.state === "submitting"}
										>
											{fetcher1.state === "submitting" ? (
												<LoaderCircleIcon className="animate-spin" />
											) : (
												<SendIcon />
											)}
											作成
										</Button>
									</Field>
								</FieldGroup>
							</fetcher1.Form>
						</CardContent>
					</CollapsibleContent>
				</Card>
				<AlertDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{initialAvailability
									? "本当に募集を始めてもいいですか？"
									: "募集リンクを作成します。"}
							</AlertDialogTitle>
							<AlertDialogDescription>
								<span>
									現在の初期設定は「{initialAvailability ? "有効" : "停止"}
									」です。
								</span>
								<span>いつでも停止・再開できます。</span>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>キャンセル</AlertDialogCancel>
							<AlertDialogAction
								type="button"
								onClick={() => {
									if (formRef.current) {
										fetcher1.submit(formRef.current)
									}
								}}
							>
								募集を始める
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</Collapsible>
		</div>
	)
}
