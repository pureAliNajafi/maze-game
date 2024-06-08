import { motion } from "framer-motion";
import React from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
type Props = {
  rotate: number;
};

const Arrow = ({ rotate = 0 }: Props) => {
  return (
    <motion.div className="w-fit h-fit" style={{ rotate: rotate + "deg" }}>
      <FaLongArrowAltUp size={16} />
    </motion.div>
  );
};

export default Arrow;
