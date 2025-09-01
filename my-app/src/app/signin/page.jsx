"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

const TH_PROVINCES = [
  "กรุงเทพมหานคร",
  "กระบี่",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงใหม่",
  "เชียงราย",
  "ตรัง",
  "ตราด",
  "ตาก",
  "นครนายก",
  "นครปฐม",
  "นครพนม",
  "นครราชสีมา",
  "นครศรีธรรมราช",
  "นครสวรรค์",
  "นนทบุรี",
  "นราธิวาส",
  "น่าน",
  "บุรีรัมย์",
  "ปทุมธานี",
  "ประจวบคีรีขันธ์",
  "ปราจีนบุรี",
  "ปัตตานี",
  "พระนครศรีอยุธยา",
  "พังงา",
  "พัทลุง",
  "พิจิตร",
  "พิษณุโลก",
  "เพชรบุรี",
  "เพชรบูรณ์",
  "แพร่",
  "พะเยา",
  "ภูเก็ต",
  "มหาสารคาม",
  "มุกดาหาร",
  "แม่ฮ่องสอน",
  "ยะลา",
  "ยโสธร",
  "ร้อยเอ็ด",
  "ระนอง",
  "ระยอง",
  "ราชบุรี",
  "ลพบุรี",
  "ลำปาง",
  "ลำพูน",
  "เลย",
  "ศรีสะเกษ",
  "สกลนคร",
  "สงขลา",
  "สตูล",
  "สมุทรปราการ",
  "สมุทรสงคราม",
  "สมุทรสาคร",
  "สระแก้ว",
  "สระบุรี",
  "สิงห์บุรี",
  "สุโขทัย",
  "สุพรรณบุรี",
  "สุราษฎร์ธานี",
  "สุรินทร์",
  "หนองคาย",
  "หนองบัวลำภู",
  "อ่างทอง",
  "อุดรธานี",
  "อุทัยธานี",
  "อุตรดิตถ์",
  "อุบลราชธานี",
  "อำนาจเจริญ",
  "บึงกาฬ",
];

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [gender, setGender] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // simple email check: contains @
    if (email.length === 0) {
      setEmailError("");
    } else if (!email.includes("@")) {
      setEmailError("อีเมลต้องมีเครื่องหมาย @");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError("");
      return;
    }
    const hasMin = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasMin) setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
    else if (!hasLetter || !hasNumber)
      setPasswordError("รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข");
    else setPasswordError("");
  }, [password]);

  function validateDob(value) {
    if (!value) return "กรุณาเลือกวันเดือนปีเกิด";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "วันเกิดไม่ถูกต้อง";
    // ensure input components match (avoid timezone shifts)
    const [y, m, day] = value.split("-").map((s) => parseInt(s, 10));
    if (d.getFullYear() !== y || d.getMonth() + 1 !== m || d.getDate() !== day)
      return "วันเดือนปีเกิดไม่ถูกต้อง";
    if (d > new Date()) return "วันเกิดต้องไม่เป็นอนาคต";
    return "";
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = [];
    if (!email) errors.push("กรุณากรอกอีเมล");
    else if (!email.includes("@")) errors.push("อีเมลต้องมีเครื่องหมาย @");

    if (!password) errors.push("กรุณากรอกรหัสผ่าน");
    else {
      if (password.length < 8) errors.push("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
        errors.push("รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข");
    }

    if (!firstName) errors.push("กรุณากรอกชื่อ");
    if (!lastName) errors.push("กรุณากรอกนามสกุล");

    const dobError = validateDob(dob);
    if (dobError) errors.push(dobError);

    if (!address) errors.push("กรุณากรอกที่อยู่");

    if (!province) errors.push("กรุณาเลือกจังหวัด");
    else if (!TH_PROVINCES.includes(province)) errors.push("จังหวัดไม่ถูกต้อง");

    if (!gender) errors.push("กรุณาเลือกเพศ");

    if (errors.length > 0) {
      alert("เกิดข้อผิดพลาด:\n" + errors.join("\n"));
      return;
    }

    const registration = {
      email,
      firstName,
      lastName,
      dob,
      address,
      province,
      gender,
    };

    alert("ลงทะเบียนสำเร็จ");
    console.log("Registered user:", registration);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", my: 4 }}>
      <CardContent>
        <form onSubmit={handleRegister}>
          <TextField
            label="อีเมล"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            label="รหัสผ่าน"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError || "อย่างน้อย 8 ตัว, มีตัวเลขและตัวหนังสือ"}
          />

          <TextField
            label="ชื่อ"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label="นามสกุล"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            label="วันเกิด"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="ที่อยู่"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="province-label">จังหวัด</InputLabel>
            <Select
              labelId="province-label"
              value={province}
              label="จังหวัด"
              onChange={(e) => setProvince(e.target.value)}
            >
              {TH_PROVINCES.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="ชาย" control={<Radio />} label="ชาย" />
              <FormControlLabel value="หญิง" control={<Radio />} label="หญิง" />
              <FormControlLabel value="ไม่ระบุ" control={<Radio />} label="ไม่ระบุ" />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            ลงทะเบียน
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
