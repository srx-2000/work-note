# torch.nn的常用的类及其含义

1. nn.Linear: 线性层，实现全连接层。

2. nn.Conv2d 和 nn.ConvTranspose2d: 二维卷积层和反卷积层。

3. nn.BatchNorm2d: 批标准化层，对网络中每个 mini-batch 进行标准化。

4. nn.MaxPool2d 和 nn.AvgPool2d: 最大池化层和平均池化层。

5. nn.Dropout 和 nn.Dropout2d: 随机失活层，用于防止过拟合。

6. nn.Embedding: 嵌入层，用于将离散数据映射为连续的低维向量表示。

7. nn.LSTM 和 nn.GRU: 长短时记忆网络和门控循环单元，用于处理序列数据。

8. nn.Softmax 和 nn.LogSoftmax: softmax 和 log softmax 层，用于将输出映射为概率分布。

9. nn.CrossEntropyLoss 和 nn.BCELoss: 交叉熵损失和二元交叉熵损失，常用于分类问题的损失函数。

10. nn.MSELoss: 均方误差损失，常用于回归问题的损失函数

11. nn.Sequential: 顺序容器，用于按照一定的顺序组织网络层。

12. nn.Parameter: 可训练参数，用于在网络中定义需要优化的参数。

13. nn.functional: 包含常用的函数，如激活函数、损失函数等。

14. nn.ModuleList 和 nn.ModuleDict: 用于管理子模块的列表和字典容器。

15. nn.utils.rnn: 包含一些处理序列数据的实用函数，如 pack_padded_sequence 和 pad_packed_sequence 等。

16. nn.NLLLoss: 负对数似然损失，用于多分类问题。

17. nn.CrossEntropyLoss 和 nn.BCEWithLogitsLoss: 交叉熵损失和带 sigmoid 的二元交叉熵损失，常用于二分类问题。

18. nn.MultiLabelSoftMarginLoss: 适用于多标签分类问题的软件最大损失。

19. nn.MultiMarginLoss: 适用于多分类问题的边缘损失。

20. nn.functional.interpolate: 用于对图像进行上采样和下采样的函数，支持不同的插值方式。

21. nn.Softmax2d: 二维 softmax 层，用于对多通道的图像进行分类。

22. nn.functional.pad: 用于在输入数据周围进行填充的函数，可用于图像处理中的零填充。

23. nn.functional.conv1d 和 nn.functional.conv_transpose1d: 一维卷积和反卷积的函数。

24. nn.BatchNorm1d 和 nn.BatchNorm3d: 一维和三维批标准化层。

25. nn.functional.interpolate 和 nn.Upsample: 用于进行上采样的函数，支持不同的插值方式。

26. nn.AdaptiveAvgPool2d 和 nn.AdaptiveMaxPool2d: 自适应平均池化和最大池化层，可以对输入数据进行自适应大小的池化操作。

27. nn.PixelShuffle: 像素重排层，用于将通道数减少的图像还原为高分辨率图像。

28. nn.Transformer 和 nn.TransformerEncoder: Transformer 模型和 Transformer 编码器，用于处理序列数据的模型。

29. nn.EmbeddingBag: 用于处理可变长度输入的嵌入层，可以实现文本分类和情感分析等任务。

30. nn.RNNCell 和 nn.LSTMCell: 单个循环神经网络单元，可以用于自定义循环神经网络结构。