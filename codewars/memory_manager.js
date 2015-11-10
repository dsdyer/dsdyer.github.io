/**
 * @constructor Creates a new memory manager for the provided array.
 * @param {memory} An array to use as the backing memory.
 */
function MemoryManager(memory){
  this.memory = memory;
  this.blocks = [];  // A block is an object with index and size.
                     // Index+size is the first address not in the block
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

  if (this.blocks.length === 0) {
    if (size <= this.memory.length) {
      this.blocks.push({index: 0, size: size});
      return 0;
    } else {
      throw new Error('Impossible block1');
    }
  }
  var smallest_viable_size = this.memory.length;
  var blocks_index = 0;

  this.blocks.forEach(function(c,i,a) {
    if (i < a.length - 1) {

      var new_size = a[i+1].index - c.index - c.size;

    } else {

      var new_size = this.memory.length - c.index - c.size;
      if (new_size < size) {
        new_size = c.index;
      }

    }

      if (new_size >= size) {
        if (new_size < smallest_viable_size) {
          smallest_viable_size = new_size;
          blocks_index = i;

        }
      }
  }, this);

  if (smallest_viable_size === this.memory.length) throw new Error('Impossible block2');

  var new_index = this.blocks[blocks_index].index + this.blocks[blocks_index].size;
  // Create an object holding block's index and size
  this.blocks.push({index: new_index, size: size});
  return new_index;
};

/**
 * Releases a previously allocated block of memory.
 * @param {number} pointer - The pointer to the block to release.
 * @throws If the pointer does not point to an allocated block.
 */
MemoryManager.prototype.release = function(pointer){
  // To do:
  var safe_address = false;

  this.blocks = this.blocks.sort(function(a,b) {
    if (a.index === pointer) {                   // This sorts the blocks array in ascending order,
      if (!safe_address) safe_address = true;    // but with the requested block at the end
      return 1;
    } else {
      return a - b;
    }
  });
  if (!safe_address) {
    throw new Error('Not a valid pointer!');
  }
};

/**
 * Reads the value at the location identified by pointer
 * @param {number} pointer - The location to read.
 * @returns {number} The value at that location.
 * @throws If pointer is in unallocated memory.
 */
MemoryManager.prototype.read = function(pointer) {
  // To do:
  // Make sure the pointer points to allocated memory

  for (var i = 0; i < this.blocks.length; i++) {
    if (this.blocks[i].index < pointer < this.blocks[i].index + this.blocks[i].size) {
      return this.memory[pointer];
    }
  }
  throw new Error("That ain\'t a valid pointer!");
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
  for (var i = 0; i < this.blocks.length; i++) {
    if ((this.blocks[i].index <= pointer) && pointer < (this.blocks[i].index + this.blocks[i].size)) {
      this.memory[pointer] = value;
      return;
    }
  }
  throw new Error("That ain\'t a valid pointer!");
};
