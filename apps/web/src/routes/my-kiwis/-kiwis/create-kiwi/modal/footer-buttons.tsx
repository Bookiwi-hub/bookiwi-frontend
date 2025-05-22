import { Button } from "#/components/ui/button";

interface ButtonProps {
  onClick: () => void;
  onClickSecondary?: () => void;
}

export type FooterButtonProps = Partial<ButtonProps>;

export function Step1FooterButton({ onClick }: FooterButtonProps) {
  return (
    <Button onClick={onClick} className="ml-auto">
      다음
    </Button>
  );
}

export function Step2FooterButton({
  onClick,
  onClickSecondary,
}: FooterButtonProps) {
  return (
    <>
      <Button variant="outline" onClick={onClickSecondary}>
        이전
      </Button>
      <Button type="submit" onClick={onClick}>
        만들기
      </Button>
    </>
  );
}

// Step3 doesn't have buttons (loading screen)

export function Step3FooterButton({ onClick }: FooterButtonProps) {
  return (
    <Button onClick={onClick} className="ml-auto">
      취소
    </Button>
  );
}

export function Step4FooterButton({ onClick }: FooterButtonProps) {
  return (
    <Button onClick={onClick} className="ml-auto">
      완료
    </Button>
  );
}
