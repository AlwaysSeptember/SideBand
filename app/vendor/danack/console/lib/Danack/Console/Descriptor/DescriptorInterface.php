<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Danack\Console\Descriptor;

use Danack\Console\Output\OutputInterface;

/**
 * Descriptor interface.
 *
 * @author Jean-François Simon <contact@jfsimon.fr>
 */
interface DescriptorInterface
{
    /**
     * Describes an InputArgument instance.
     *
     * @param OutputInterface $output
     * @param object          $object
     * @param array           $options
     */
    public function describe(OutputInterface $output, $object, array $options = array());
}
