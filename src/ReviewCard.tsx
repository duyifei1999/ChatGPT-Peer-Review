import React, { useState } from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material';

export type WordType = {
  text: string;
  value: number;
};

export const words = [
  {
    text: 'Hello',
    value: 0,
  },
  {
    text: 'World',
    value: 24,
  },
  {
    text: 'Future',
    value: 64,
  },
//   {
//     text: 'bad',
//     value: 100000,
//   },
];

type WordCloudProps = {
  currentWords: WordType[];
  setCurrentWords: React.Dispatch<React.SetStateAction<WordType[]>>;
};

export const wordCloudStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  width: '150px',
};

export const reviewOptionStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '50%',
  width: '450px',
};
const colors = ['#82a6c2', '#2F6B9A', '#143059'];
const getMaxValue = (wordsArray: WordType[]): number => Math.max(...wordsArray.map((w) => w.value));

const options = {
  rotations: 2,
  rotationAngles: [-90, 0] as [number, number],
  deterministic: true,
  enableOptimizations: true,
  transitionDuration: 0,
};

const size = [600, 400] as [number, number];

type ReviewOptionProps = {
  setCurrentWords: React.Dispatch<React.SetStateAction<WordType[]>>;
};

export function ReviewOption({ setCurrentWords }: ReviewOptionProps) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const handleClose = () => {
    setReviewOpen(false);
  };

  const handleCheckboxChange = (word: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedWords((prevWords) => [...prevWords, word]);
    } else {
      setSelectedWords(((prevWords) => prevWords.filter((w) => w !== word)));
    }
  };

  const handleSubmit = () => {
    // 增加所选单词的权重
    // eslint-disable-next-line no-confusing-arrow
    setCurrentWords((prevWords) => prevWords.map((word) => selectedWords.includes(word.text) ? { ...word, value: word.value + 1 } : word));

    // 清空所选单词列表
    setSelectedWords([]);

    // 关闭对话框
    handleClose();
  };

  return (
    <div>
      <Button onClick={() => setReviewOpen(true)} style={{ fontSize: '8px' }}>Add</Button>
      <Dialog open={reviewOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review Words</DialogTitle>
        <DialogContent>
          <input type="checkbox" id="option1" name="option1" value="Hello" onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)} />
          <label htmlFor="option1"> Hello </label>
          <br />
          <input type="checkbox" id="option2" name="option2" value="World" onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)} />
          <label htmlFor="option2"> World </label>
          <br />
          <input type="checkbox" id="option3" name="option3" value="Future" onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)} />
          <label htmlFor="option3"> Future </label>
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function MyWordCloud({ currentWords, setCurrentWords }: WordCloudProps) {
  const validWords = currentWords.filter((word) => word.value !== 0);
  const callbacks = {
    getWordColor: (word: WordType) => {
      // const fraction = word.value / maxWordValue;
      if (word.value <= 20) return colors[0];
      if (word.value <= 50) return colors[1];
      return colors[2];
    },
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: (word: WordType) => `${word.text} (${word.value})`,
  };

  return (
    <div style={wordCloudStyle}>
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        size={size}
        words={validWords}
      />
    </div>
  );
}
