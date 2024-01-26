package Services

func GroupElements(inputArray [][]int) [][]int {

	resultMap := make(map[int][]int)

	for _, pair := range inputArray {
		key := pair[1]
		if _, ok := resultMap[key]; !ok {
			resultMap[key] = []int{}
		}
		resultMap[key] = append(resultMap[key], pair[0])
	}

	var resultList [][]int
	for _, value := range resultMap {
		resultList = append(resultList, value)
	}

	return resultList
}
