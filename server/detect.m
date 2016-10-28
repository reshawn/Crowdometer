load('crowdClassifier.mat', 'categoryClassifier');
img = imread(fullfile('./', 'img.jpg'));
[labelIdx, scores] = predict(categoryClassifier, img);
result = categoryClassifier.Labels(labelIdx);
system(['python sendResultToFirebase.py "', result{1, 1}, '"']);