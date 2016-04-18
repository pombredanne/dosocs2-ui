from pymongo import MongoClient

import sys
import subprocess


# MongoURL 
## If switching to a mongo server instead of meteor mongo, ensure that the configuration is save

# This is a tiny wrapper around dosoc2

def call_dosocs2(pkg_path):
    try:
        spdxdoc = subprocess.check_output(['dosocs2', 'oneshot', pkg_path])
        sys.stdout.write(spdxdoc)

    except:
        sys.stderr.write("Error in scanning package {}".format(pkg_path))


call_dosocs2(sys.argv[1])

if __name__ == "__main__":
    call_dosocs2(sys.argv[1])
