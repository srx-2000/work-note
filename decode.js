{
    _$i8 = _$nl[_$fN];
    if (_$i8 <= 63) {
        if (_$i8 <= 15) {
            if (_$i8 <= 3) {
                if (_$i8 <= 0) {
                    _$$5 = _$_I[--_$$8];
                    _$ki = _$_I[--_$$8];
                    _$_I[_$$8++] = _$ki[_$$5];
                } else if (_$i8 <= 1) {
                    _$$8 -= 2;
                    _$$5 = _$$8;
                    _$_x();
                    _$_I[_$$8++] = _$ki[_$$Y](_$_I[_$$5], _$_I[_$$5 + 1]);
                } else if (_$i8 <= 2) {
                    _$nl[_$fN] = 79;
                    _$$Y = _$dD[_$nl[++_$fN]];
                    _$nl[_$fN] = _$$Y;
                    _$$5 = _$_I[--_$$8];
                    _$_I[_$$8++] = _$$5[_$$Y];
                } else {
                    _$$5 = _$_I[--_$$8];
                    _$_d = _$nl[++_$fN];
                    if (_$$5) {
                        // do nothing
                    } else {
                        _$fN += _$_d;
                    }
                }
            } else if (_$i8 <= 7) {
                if (_$i8 <= 4) {
                    _$_d = _$nl[++_$fN];
                    _$iH = _$_I.slice(_$$8 - _$_d, _$$8);
                    _$$8 -= _$_d;
                    _$_x();
                    _$_I[_$$8++] = _$mt(_$ki[_$$Y], _$iH);
                } else if (_$i8 <= 5) {
                    _$$5 = _$_I[--_$$8];
                    _$_1[4] = 1;
                    _$_1[5] = _$$5;
                    _$fN = _$$x;
                } else if (_$i8 <= 6) {
                    _$$5 = typeof _$_I[--_$$8];
                    _$_I[_$$8++] = _$$5;
                } else {
                    _$$Y = _$_I[--_$$8];
                    _$ki = _$_I[--_$$8];
                }
            } else if (_$i8 <= 11) {
                if (_$i8 <= 8) {
                    _$$8 -= 2;
                    _$$5 = _$$8;
                    _$_x();
                    _$ki = _$ki[_$$Y];
                    _$_I[_$$8++] = _$ki(_$_I[_$$5], _$_I[_$$5 + 1]);
                } else if (_$i8 <= 9) {
                    _$$5 = _$_I[--_$$8];
                    _$$5 = _$_I[--_$$8] * _$$5;
                    _$_I[_$$8++] = _$$5;
                } else if (_$i8 <= 10) {
                    _$$8--;
                    _$$5 = _$$8;
                    _$_x();
                    _$$5 = _$ki[_$$Y](_$_I[_$$5]);
                } else {
                    _$$Y = _$nl[++_$fN];
                    _$_I[_$$8++] = _$cS(_$ch._$aK[_$$Y], _$_1)
                }
            } else if (_$i8 <= 12) {
                _$_I[_$$8++] = _$af[_$nl[++_$fN]]
            } else if (_$i8 <= 13) {
                _$_x();
                _$_I[_$$8++] = _$ki[_$$Y]();
            } else if (_$i8 <= 14) {
                _$$5 = _$_I[--_$$8];
                _$$5 = _$_I[--_$$8] in _$$5;
                _$_I[_$$8++] = _$$5;
            } else {
                _$$5 = _$_I[--_$$8];
                _$$5 = _$_I[--_$$8] - _$$5;
                _$_I[_$$8++] = _$$5
            }
        } else if (_$i8 <= 31) {
            if (_$i8 <= 19) {
                if (_$i8 <= 16) {
                    _$$Y = _$nl[++_$fN];
                    _$ki = _$af;
                } else if (_$i8 <= 17) {
                    _$$Y = _$nl[++_$fN];
                    _$$5 = _$_I[--_$$8];
                    if (!_$$5) {
                        _$fN += _$$Y;
                        ++_$$8
                    } else {
                        0
                    }
                } else if (_$i8 <= 18) {
                    _$$5 = _$_I[--_$$8];
                    _$ki = _$_I[_$$8 - 1];
                    _$ki[_$dD[_$nl[++_$fN]]] = _$$5;
                } else {
                    _$$Y = _$nl[++_$fN];
                    _$ki = _$a3;
                }
            } else if (_$i8 <= 23) {
                if (_$i8 <= 20) {
                    _$_d = _$nl[++_$fN];
                    _$fN -= _$_d;
                } else if (_$i8 <= 21) {
                    _$$8--;
                    _$$5 = _$$8;
                    _$_x();
                    _$ki = _$ki[_$$Y];
                    _$$5 = _$ki(_$_I[_$$5])
                } else if (_$i8 <= 22) {
                    _$$5 = _$_I[--_$$8];
                    _$$5 = _$_I[--_$$8] == _$$5;
                    _$_I[_$$8++] = _$$5
                } else {
                    _$_I[_$$8++] = false
                }
            } else if (_$i8 <= 27) {
                if (_$i8 <= 24) {
                    _$$Y = _$nl[++_$fN];
                    _$ki = _$nH
                } else if (_$i8 <= 25) {
                    _$_I[_$$8++] = true
                } else if (_$i8 <= 26) {
                    _$$Y = _$nl[++_$fN];
                    _$ki = _$eU
                } else {
                    _$$5 = _$_I[--_$$8];
                    _$$5 = _$_I[--_$$8] > _$$5;
                    _$_I[_$$8++] = _$$5
                }
            } else if (_$i8 <= 28) {
                _$_I[_$$8++] = _$eU[_$nl[++_$fN]]
            } else if (_$i8 <= 29) {
                _$$5 = _$_I[--_$$8];
                _$$5 = _$_I[--_$$8] + _$$5;
                _$_I[_$$8++] = _$$5
            } else if (_$i8 <= 30) {
                _$$8--;
                _$$5 = _$$8;
                _$_x();
                _$ki = _$ki[_$$Y];
                _$_I[_$$8++] = _$ki(_$_I[_$$5])
            } else {
                _$_I[_$$8++] = _$nH[_$nl[++_$fN]]
            }
        } else if (_$i8 <= 47) {
            if (_$i8 <= 35) {
                if (_$i8 <= 32) {
                    _$$5 = _$_I[--_$$8];
                    _$$5 = _$_I[--_$$8] !== _$$5;
                    _$_I[_$$8++] = _$$5
                } else if (_$i8 <= 33) {
                    _$$5 = _$_I[--_$$8];
                    _$ki = _$_I[_$$8 - 1];
                    _$ki.push(_$$5)
                } else if (_$i8 <= 34) {
                    _$kb = _$nl[++_$fN];
                    _$$Y = _$nl[++_$fN];
                    _$ki = _$_C[_$kb];
                } else {
                    _$$5 = _$_I[--_$$8];
                    _$$5 = _$_I[--_$$8] & _$$5;
                    _$_I[_$$8++] = _$$5
                }
            } else if (_$i8 <= 39) {
                if (_$i8 <= 36) {
                    _$_x();
                    _$ki = _$ki[_$$Y];
                    _$$5 = _$ki()
                } else if (_$i8 <= 37) {
                    _$$5 = _$_I[--_$$8];
                    _$_x();
                    _$$5 = _$ki[_$$Y] |= _$$5
                } else if (_$i8 <= 38) {
                    _$_I[_$$8++] = _$a3[_$nl[++_$fN]]
                } else {
                    _$_I[_$$8++] = {}
                }
            } else if (_$i8 <= 43) {
                if (_$i8 <= 40) {
                    _$nl[_$fN] = 48;
                    _$$Y = _$nl[++_$fN];
                    _$$5 = _$fG[_$$Y];
                    _$nl[_$fN] = _$$5;
                    _$_I[_$$8++] = _$$5
                } else if (_$i8 <= 41) {
                    _$$8 -= 2;
                    _$$5 = _$$8;
                    _$_x();
                    _$ki = _$ki[_$$Y];
                    _$$5 = _$ki(_$_I[_$$5], _$_I[_$$5 + 1])
                } else if (_$i8 <= 42) {
                    _$$5 = _$_I[--_$$8];
                    _$$5 = _$_I[--_$$8] != _$$5;
                    _$_I[_$$8++] = _$$5
                } else {
                    _$_1[4] = 2;
                    _$fN = _$$x
                }
            } else if (_$i8 <= 44) {
                _$$8 -= 3;
                _$$5 = _$$8;
                _$_x();
                _$ki = _$ki[_$$Y];
                _$$5 = _$ki(_$_I[_$$5], _$_I[_$$5 + 1], _$_I[_$$5 + 2])
            } else if (_$i8 <= 45) {
                _$$8 -= 2;
                _$$5 = _$$8;
                _$_x();
                _$$5 = _$ki[_$$Y](_$_I[_$$5], _$_I[_$$5 + 1])
            } else if (_$i8 <= 46) {
                _$nl[_$fN] = 68;
                _$$Y = _$dD[_$nl[++_$fN]];
                _$nl[_$fN] = _$$Y;
                _$ki = _$_I[--_$$8]
            } else {
                _$_I[_$$8++] = []
            }
        } else if (_$i8 <= 51) {
            if (_$i8 <= 48) {
                _$_I[_$$8++] = _$nl[++_$fN]
            } else if (_$i8 <= 49) {
                _$_x();
                _$ki = _$ki[_$$Y];
                _$_I[_$$8++] = _$ki()
            } else if (_$i8 <= 50) {
                _$$5 = _$_I[--_$$8];
                _$_x();
                _$$5 = _$ki[_$$Y] += _$$5
            } else {
                _$de(_$ch, _$nl[++_$fN], _$nl[++_$fN], _$_d = _$nl[++_$fN], _$nl[++_$fN], _$fN + 1, _$nH, _$_1);
                if (_$_1[4]) {
                    _$fN = _$$x
                } else {
                    _$fN += _$_d
                }
            }
        }
        else if (_$i8 <= 55) {
            if (_$i8 <= 52) {
                _$$5 = _$_I[--_$$8];
                _$$5 = _$_I[--_$$8] < _$$5;
                _$_I[_$$8++] = _$$5
            } else if (_$i8 <= 53) {
                _$$8--;
                _$$5 = _$$8;
                _$_x();
                _$_I[_$$8++] = _$ki[_$$Y](_$_I[_$$5])
            } else if (_$i8 <= 54) {
                _$kb = _$nl[++_$fN];
                _$_I[_$$8++] = _$_C[_$kb][_$nl[++_$fN]]
            } else {
                _$$5 = _$ki[_$$Y]++
            }
        }
        else if (_$i8 <= 59) {
            if (_$i8 <= 56) {
                _$$5 = _$_I[--_$$8];
                _$_x();
                _$ki[_$$Y] = _$$5
            }
            else if (_$i8 <= 57) {
                _$$Y = _$nl[++_$fN];
                _$$5 = _$_I[--_$$8];
                if (_$$5) {
                    _$fN += _$$Y;
                    ++_$$8
                } else {
                }
            }
            else if(_$i8 <= 58){
                _$$5 = _$_I[--_$$8];
                _$_I[_$$8++] = !_$$5
            }
            else {
                _$kb = _$nl[++_$fN];
                _$_I[_$$8++] = _$hx[_$kb][_$nl[++_$fN]]
            }
        }
        else if(_$i8 <= 60){
            _$_d = _$nl[++_$fN]
            _$fN += _$_d
        }
    }
}