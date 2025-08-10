type ChatRole = "system" | "user" | "assistant";

interface AskAiOptions {
  highlightText?: string;
  systemPrompt?: string;
  signal?: AbortSignal;
  history?: Array<{
    role: Exclude<ChatRole, "system">;
    content: string;
  }>;
}

export const askAi = async (
  userMessage: string,
  options: AskAiOptions = {},
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_KEY as string | undefined;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing. Set VITE_OPENAI_KEY in .env");
  }

  const { highlightText, systemPrompt, signal, history } = options;

  const messages: Array<{ role: ChatRole; content: string }> = [];

  const baseSystemPrompt =
    systemPrompt ||
    [
      "너는 '키위 AI'라는 간결한 독서 도우미야.",
      "반드시 한국어로 답변해.",
      "사용자가 추가 질문을 하도록 유도하지 마.",
      "가능하면 하이라이트 문장을 우선적인 근거로 활용해.",
      "답변은 핵심만 2~3문장으로 짧게.",
    ].join(" ");

  messages.push({ role: "system", content: baseSystemPrompt });

  if (highlightText && highlightText.trim().length > 0) {
    messages.push({
      role: "system",
      content: `Highlighted sentence (context): "${highlightText}"`,
    });
  }

  if (history && history.length > 0) {
    history
      .filter((h) => h.content && h.content.trim().length > 0)
      .forEach((h) => messages.push({ role: h.role, content: h.content }));
  }

  messages.push({ role: "user", content: userMessage });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-nano",
      messages,
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `OpenAI request failed: ${response.status} ${response.statusText} ${errorText}`,
    );
  }

  const data: any = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Invalid response from OpenAI");
  }
  return content.trim();
};
