type MyAlertProps = {
  message?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  link?: string;
};

export type IUserPopoverDetail = {
  id: number;
  nickname: string;
  avatar: string;
  address: string;
  vips_id: number;
  total_ai_income: string;
  total_ai_loyalty_value: string;
  online_status: boolean;
  follow_status: string;
  balance_loyalty: string;
};
