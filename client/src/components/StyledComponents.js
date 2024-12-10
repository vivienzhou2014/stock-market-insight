import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

// 自定义输入框
export const StyledTextField = styled(TextField)({
    width: "300px",
    marginBottom: "20px",
    // backgroundColor: "#90ee90", // 默认背景颜色为浅绿色
    "& .MuiOutlinedInput-root": {
      borderRadius: "25px", // 圆角
      color: "#000", // 输入的文字颜色为黑色
      "& fieldset": {
        borderColor: "#000", // 默认边框颜色为黑色
      },
      "&:hover fieldset": {
        borderColor: "#000", // 悬停时边框颜色保持黑色
      },
      "&.Mui-focused fieldset": {
        borderColor: "#006400", // 聚焦时边框颜色为深绿色
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      backgroundColor: "#90ee90", // 聚焦时背景颜色保持浅绿色
    },
    "& .MuiInputLabel-root": {
      color: "#000", // 标签文字颜色为黑色
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#000", // 聚焦时标签颜色保持黑色
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "#000", // 占位符文字颜色为黑色
    },
  });

// 自定义按钮
export const StyledButton = styled(Button)({
  borderRadius: "25px", // 圆角
  padding: "10px 20px",
  backgroundColor: "#82b7ac", // 按钮颜色
  "&:hover": {
    backgroundColor: "#699289", // 悬停时按钮颜色
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // 悬停时阴影效果
  },
});