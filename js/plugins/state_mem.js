/**
 * In-memory state management plugin.
 */

const stateMemory = {
  state: {},
  
  get(key) {
    return this.state[key];
  },
  
  set(key, value) {
    this.state[key] = value;
  },
  
  has(key) {
    return this.state.hasOwnProperty(key);
  },
  
  remove(key) {
    delete this.state[key];
  },
  
  clear() {
    this.state = {};
  }
};

export default stateMemory;
