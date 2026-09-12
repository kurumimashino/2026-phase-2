import { InvalidMailDomainError } from "~/domain/data/errors"
import type { Result } from "~/lib/result"
import { fail, success } from "~/lib/result"

export async function validateMail(
	mail: string,
): Promise<Result<null, InvalidMailDomainError>> {
	const wasedaMailDomains = [
		"@akane.waseda.jp",
		"@asagi.waseda.jp",
		"@fuji.waseda.jp",
		"@moegi.waseda.jp",
		"@ruri.waseda.jp",
		"@suou.waseda.jp",
		"@toki.waseda.jp",
		"@waseda.jp",
	]

	if (!wasedaMailDomains.some((domain) => mail.endsWith(domain))) {
		return fail(
			new InvalidMailDomainError("メールアドレスの形式が正しくありません"),
		)
	}
	return success(null)
}
