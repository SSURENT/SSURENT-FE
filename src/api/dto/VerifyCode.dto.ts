export interface VerifyCodeRequestDto {
  phoneNum: string;
  code: string;
}

export interface VerifyCodeResponseDto {
  resetToken: string;
}
