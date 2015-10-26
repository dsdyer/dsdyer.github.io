paths = 0

def pathFinder(x,n):
  global paths
  paths += n + 1; # 1xn grid

  for i in range(1,n):
    for j in range(0,x):
      pathFinder(i, j);

  return paths;


print(pathFinder(20,20));

