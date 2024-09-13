import * as tf from '@tensorflow/tfjs';
import React from 'react';

const Test = () => {
  React.useEffect(() => {
    const xs = tf.tensor2d([[1], [2], [3], [4]]); // 输入
    const ys = tf.tensor2d([[1], [3], [5], [7]]); // 输出
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] })); // 单层线性回归模型

    model.compile({
      optimizer: 'sgd',  // 随机梯度下降法
      loss: 'meanSquaredError'  // 均方误差
    });

    async function trainModel() {
      await model.fit(xs, ys, {
        epochs: 1000, // 训练100次
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
            console.log(logs)
          }
        }
      });
    }

    // trainModel().then(() => {
    //   // 模型训练完成后进行预测
    //   const output = model.predict(tf.tensor2d([5], [1, 1]));
    //   console.log(output);
    // });


    // const output = model.predict(tf.tensor2d([5], [1, 1]));
    // console.log(output);

  }, [])

  return <div>Test</div>
}

export default Test;
