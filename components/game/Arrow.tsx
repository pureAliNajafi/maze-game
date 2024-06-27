import { motion } from "framer-motion";
import React from "react";
import { BsX } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
type Props = {
  rotate: number;
};

const Arrow = ({ rotate: rotateDeg = 0 }: Props) => (
  <div>
    {rotateDeg !== -1 ? (
      <motion.div className="w-fit h-fit" style={{ transform: `rotate(${rotateDeg}deg)` }}>
        <FaLongArrowAltRight size={16} />
      </motion.div>
    ) : (
      <BsX size={16} />
    )}
  </div>
);

export default Arrow;
