class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        def merge(nums,low,mid,high):
            temp=[]
            left=low
            right=mid+1
            while left<=mid and right<=high:
                if nums[left]<=nums[right]:
                    temp.append(nums[left])
                    left+=1
                else:
                    temp.append(nums[right])
                    right+=1
            while left<=mid:
                temp.append(nums[left])
                left+=1
            while right<=high:
                temp.append(nums[right])
                right+=1
            for i in range(low,high+1):
                nums[i]=temp[i-low]

        def countPairs(nums, low, mid, high):
            right = mid + 1
            cnt = 0
            for i in range(low, mid + 1):
                while right <= high and nums[i] > 2 * nums[right]:
                    right += 1
                cnt += (right - (mid + 1))
            return cnt

        def mergeSort(arr, low, high):
            cnt = 0
            if low >= high:
                return cnt
            mid = (low + high) // 2
            cnt += mergeSort(nums, low, mid)  # left half
            cnt += mergeSort(nums, mid + 1, high)  # right half
            cnt += countPairs(nums, low, mid, high)  # Modification
            merge(nums, low, mid, high)  # merging sorted halves
            return cnt
        n=len(nums)
        ans=mergeSort(nums, 0, n-1)
        return ans
