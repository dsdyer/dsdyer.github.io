/**
 * @constructor Creates a new memory manager for the provided array.
 * @param {memory} An array to use as the backing memory.
 */
function MemoryManager(memory){
  this.memory = memory;
  this.blocks = [];
  this.free_mem_sizes = [0, this.memory.length, 0];
}

/**
 * Allocates a block of memory of requested size.
 * @param {number} size - The size of the block to allocate.
 * @returns {number} A pointer which is the index of the first location in the allocated block.
 * @throws If it is not possible to allocate a block of the requested size.
 */
MemoryManager.prototype.allocate = function(size) {
  // To do: 
  // Find the best place to start a new block
  var free_blocks = this.free_mem_sizes;
  console.log('starting allocate');
  var x = free_blocks.sort(function(a,b) { // X is the smallest sized span of free memory 
  	return a-b;							               // that can be sectioned into a block of requested size
  });
  for (var i = 0; i < x.length; i++) {
  	if (x[i] > size ) {
      console.log(x[i]);
  	  x = x[i];
  	  break;
  	}	
  }


  var block_index;  // Int
  // Create an object holding block's index and size
  this.blocks.push({index: block_index, size: size});
};

/**
 * Releases a previously allocated block of memory.
 * @param {number} pointer - The pointer to the block to release.
 * @throws If the pointer does not point to an allocated block.
 */
MemoryManager.prototype.release = function(pointer){
  // To do:

  var block = this.blocks.sort(function(a,b) {
    if (a.index === pointer) {
    	return 1;
    } else {
    	return a - b;
    }
  }).pop();

  // Merge any adjacent free blocks

};

/**
 * Reads the value at the location identified by pointer
 * @param {number} pointer - The location to read.
 * @returns {number} The value at that location.
 * @throws If pointer is in unallocated memory.
 */
MemoryManager.prototype.read = function(pointer){
  // To do:
  // Make sure the pointer points to allocated memory
  if (pointerIsAllocated) {
    return this.memory[pointer];
	} else {
		throw "That ain\'t a valid pointer!";
	}
};


/**
 * Writes a value to the location identified by pointer
 * @param {number} pointer - The location to write to.
 * @param {number} value - The value to write.
 * @throws If pointer is in unallocated memory.
 */
MemoryManager.prototype.write = function(pointer, value){
  // To do:
  // Make sure the pointer points to allocated memory
  if (pointerIsAllocated) {
  	this.memory[pointer] = value;
  } else {
  	  throw "That ain\'t a valid pointer!";
  }
}
